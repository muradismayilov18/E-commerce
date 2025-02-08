import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Lütfen ürün adını giriniz."],
            maxLength: [255, "Ürün adı 255 karakterden uzun olamaz."]
        },

        price: {
            type: Number,
            required: [true, "Lütfen fiyatı giriniz."],
            maxLength: [10, "Ürün fiyatı 10 karakterden uzun olamaz."]
        },

        description: {
            type: String,
            required: [true, "Lütfen açıklama kısmını giriniz."]
        },

        ratings: {
            type: Number,
            default: 0
        },

        images: [
            {
                public_id: {
                    type: String,
                    required: true
                },

                url: {
                    type: String,
                    required: true
                }
            }
        ],

        category: {
            type: String,
            required: [true, "Lütfen kategori seçiniz."],
            enum: {
                values: [
                    "Electronics",
                    "Cameras",
                    "Laptops",
                    "Accessories",
                    "Headphones",
                    "Food",
                    "Books",
                    "Sports",
                    "Outdoor",
                    "Home"
                    
                ],
                message: "Lütfen kategoriyi seçiniz."
            }
        },

        seller: {
            type: String,
            required: [true, "Lütfen ürünü satan şirketin adını giriniz."]
        },

        stock: {
            type: Number,
            required: [true, "Lütfen stok miktarını giriniz."],
        },

        numOfReviews: {
            type: Number,
            default: 0,
        },

        review: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },

                rating: {
                    type: Number,
                    required: true
                },

                comment: {
                    type: String,
                }
            }
        ],

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Product", productSchema);
