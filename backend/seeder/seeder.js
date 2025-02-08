import mongoose from "mongoose";
import products from "./data.js";
import Product from "../model/Product.js";

const seedProducts = async () => {
    try {
        // Veritabanına bağlan
        await mongoose.connect("mongodb://localhost:27017/e-commerce");

        // Eski ürünleri sil
        await Product.deleteMany();
        console.log("Ürünler başarıyla silindi.");

        // Yeni ürünleri ekle
        await Product.insertMany(products);
        console.log("Ürünler başarıyla eklendi.");

        // İşlemi sonlandır
        process.exit();
    } catch (err) {
        console.error("Bir hata oluştu:", err);
        process.exit(1); // Hata ile çıkış
    }
};

seedProducts();
