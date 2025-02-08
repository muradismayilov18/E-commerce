import express from "express";

const router = express.Router()

import { getProducts, getProductDetails, updateProduct, deleteProduct, newProduct, searchProducts } from "../controller/productController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";
import { addToCart, getCartProducts, removeFromCart, updateCartQuantity } from "../controller/cartController.js";
import { addToFavorites, getFavoriteProducts, removeFromFavorites,  } from "../controller/favoriteController.js";
import { uploadImages } from "../middleware/multer.js";

// routes/cartRoutes.js
router.put('/products/cart/update/:productId', isAuthenticatedUser, updateCartQuantity);
router.post("/products/cart", isAuthenticatedUser, addToCart);
router.delete("/products/cart/:productId", isAuthenticatedUser, removeFromCart);
router.get("/products/cart", isAuthenticatedUser, getCartProducts);

// Favorilere ekleme veya çıkarma (toggle)
router.post("/products/favorites", isAuthenticatedUser, addToFavorites);

// Kullanıcının tüm favorilerini getirme
router.get("/products/favorites", isAuthenticatedUser, getFavoriteProducts);
router.delete("/products/favorites/:productId", isAuthenticatedUser, removeFromFavorites);

router.get("/products/search", searchProducts);

router.get("/products", getProducts)
router.get("/products/:id", getProductDetails)

router.put("/admin/products/:id", isAuthenticatedUser, authorizeRoles("admin"),uploadImages, updateProduct)
router.delete("/admin/products/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
router.post("/admin/products", isAuthenticatedUser, authorizeRoles("admin"),uploadImages, newProduct)


export default router