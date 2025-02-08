import express  from "express"
import dotenv from "dotenv"
import {connectDatabase} from "./config/dbConnect.js"
import cors from "cors"
import productsRouter from "./routes/product.js"
import userRouter from "./routes/auth.js"
import errorsMiddleware from "./middleware/errors.js"
import cookieParser from "cookie-parser"
import cartRouter from "./routes/product.js"; // Sepet router'ını içe aktar

dotenv.config({
    path:"config/config.env"
})

const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
connectDatabase()
app.use(express.json())
app.use(cookieParser())
app.use("/commerce/mehsullar", productsRouter, userRouter, cartRouter)
app.use(errorsMiddleware)
app.listen(process.env.PORT, () => console.log("Server " + process.env.PORT + " - ci portda calisir..."))