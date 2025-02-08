import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../model/User.js";
import sendToken from "../utils/sendToken.js";
import { getReserPasswordTemplate } from "../utils/emailTemplates.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body

    const user = await User.create({ name, email, password })

    sendToken(user, 201, res)
})

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorHandler("Lütfen e-posta adresinizi ve şifrenizi giriniz.", 400))
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next(new ErrorHandler("Üzgünüz, bu e-posta adresine ait bir kullanıcı bulunamadı.", 401))
    }

    const isPasswordMatched = await user.shifreleriMuqayiseEt(password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Şifreniz yanlış. Lütfen tekrar deneyiniz.", 401))
    }

    sendToken(user, 200, res)
})

export const logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        message: "Başarıyla çıkış yaptınız."
    })
})

export const forgotPassword = catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findOne({email: req.body.email})

    if(!user){
        return next(new ErrorHandler("Bu e-posta adresine ait bir kullanıcı bulunamadı.", 404))
    }

    const resetToken = user.getReserPasswordToken()

    await user.save()

    const resetUrl = `${process.env.FRONTEND_URL}/commerce/mehsullar/password/reset/token/${resetToken}`

    const message = getReserPasswordTemplate(user?.name, resetUrl)

    try{
        await sendEmail({
            email: user?.email,
            subject: "Sifrenin sifirlanmasi",
            message
        })

        res.status(200).json({
            message: "Emailiniz başarıyla gönderildi. Lütfen e-posta kutunuzu kontrol ediniz."
        })
    }

    catch(err){
        user.resetPasswordExpire = undefined
        user.resetPasswordToken = undefined

        await user.save()

        return next(new ErrorHandler("Serverde gozlenilmeyen xeta bas verdi", 500))
    }
})

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHandler("Reset token is invalid or has expired", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Şifreler eşleşmiyor.", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

