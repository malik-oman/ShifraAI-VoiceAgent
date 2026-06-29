import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/connectDB.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from './routes/user.route.js'
dotenv.config()

// ===================================================
const app = express()
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json())
app.use(cookieParser())
// ===========================================================
app.get("/",(req,res)=>{
  res.json("hello omanDev")
})
// API======================================================
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)


// =====================PORT ====== SERVER STARTING POINT
const PORT = process.env.PORT
app.listen(PORT, ()=>{
  console.log(`server started on ${PORT}`)
  connectDB()
})