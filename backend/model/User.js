import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Lütfen adınızı giriniz."],
        maxLength: [50, "Adınız 50 karakterden uzun olmamalıdır."]
    },

    email: {
        type: String,
        required: [true, "Lütfen e-posta adresinizi giriniz."],
        unique: true
    },

    password: {
        type: String,
        required: [true, "Lütfen şifrenizi giriniz."],
        select: false,
        minLength: [8, "Shifreniz 8 karakterden kısa olmamalıdır."]
    },

    avatar: {
        public_id: String,
        url: String
    },

    role: {
        type: String,
        default: "user"

    },

    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.jwtTokenEldeEt = function () {

    return jwt.sign({
        id: this._id,
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: String(process.env.JWT_EXPIRES_TIME)
    })
}

userSchema.methods.shifreleriMuqayiseEt = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getReserPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex")
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire = Date.now() + 30*60*1000

    return resetToken
}



export default mongoose.model("User", userSchema)