import exporess from 'express';
import { registerUser, login, logout, forgotPassword, resetPassword } from '../controller/authController.js';

const router = exporess.Router()

router.post("/register", registerUser)
router.post("/login", login)
router.get("/logout", logout)
router.get("/password/forgot", forgotPassword)
router.put("/password/reset/:token", resetPassword)

export default router