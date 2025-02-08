import catchAsyncErrors from "../middleware/catchAsyncErrors.js"
import Product from "../model/Product.js"
import ErrorHandler from "../utils/errorHandler.js"

export const getProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find()

    if (!products) {
        return next(new ErrorHandler("Şu anda ürün bulunmamaktadır.", 404))
    }

    res.status(200).json({
        products,
    })

})

export const getProductDetails = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req?.params?.id)

    if (!product) {

        return next(new ErrorHandler("Ürün bulunamadı.", 404))
    }

    res.status(200).json({
        product
    })

}
)

export const updateProduct = catchAsyncErrors(async (req, res) => {

    let product = await Product.findById(req?.params?.id)

    if (!product) {
        return res.status(404).json({
            error: "Ürün bulunamadı."
        })
    }

    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
        new: true
    })

    res.status(200).json({
        product
    })

})

export const deleteProduct = catchAsyncErrors(async (req, res) => {

    const product = await Product.findById(req?.params?.id)

    if (!product) {
        res.status(404).json({
            error: "Ürün bulunamadı."
        })
    }

    await Product.deleteOne()

    res.status(200).json({
        message: "Ürün başarıyla silindi."
    })

})

export const newProduct = catchAsyncErrors(async (req, res, next) => {
    const images = [];
  
    // Şəkil yükləmək
    if (req.files) {
      for (let file of req.files) {
        try {
          const result = await cloudinary.v2.uploader.upload(file.path, {
            folder: "products",
          });
          images.push({ public_id: result.public_id, url: result.secure_url });
  
          // Fayl silinməsi
          fs.unlinkSync(file.path);
        } catch (error) {
          return res.status(500).json({ error: "Şəkil yüklənmədi", message: error.message });
        }
      }
    }
  
    // Yeni məhsul yaratmaq
    const product = await Product.create({ ...req.body, images });
  
    res.status(201).json({
      success: true,
      product,
    });
  });
  
export const searchProducts = catchAsyncErrors(async (req, res, next) => {
    const { query, page = 1, limit = 10 } = req.query;

    if (!query) {
        return next(new ErrorHandler("Lütfen bir arama sorgusu girin.", 400));
    }

    const searchRegex = new RegExp(query, "i");

    const products = await Product.find({
        $or: [
            { name: { $regex: searchRegex } },
            { description: { $regex: searchRegex } },
        ],
    })
        .skip((page - 1) * limit)
        .limit(limit);

    const totalProducts = await Product.countDocuments({
        $or: [
            { name: { $regex: searchRegex } },
            { description: { $regex: searchRegex } },
        ],
    });

    if (products.length === 0) {
        return next(new ErrorHandler("Aramanızla eşleşen ürün bulunamadı.", 404));
    }

    res.status(200).json({
        success: true,
        message: "Arama sonuçları başarıyla getirildi.",
        products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
    });
});