import express  from "express"
import dotenv from "dotenv"
import {connectDatabase} from "./config/dbConnect.js"

dotenv.config({
    path:"config/config.env"
})

const app = express()

app.listen(process.env.PORT, () => console.log("Server " + process.env.PORT + " - ci portda calisir..."))