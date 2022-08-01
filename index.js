import express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import commentRoutes from "./routes/comment.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();
dotenv.config();
//mongoose
const connect = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('connected to db');
    }).catch((err) => {
        throw err;
    })
}

//middleware
app.use(cors({ credentials: true }))
app.use(cookieParser())
app.use(express.json())

//routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/auth', authRoutes);



app.use((err, req,res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    })

})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    connect();
    console.log(`server listening on port ${PORT}`);
})
