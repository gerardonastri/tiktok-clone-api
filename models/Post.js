import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    userId: {
        type: String,
        reuired: true
    },
    title: {
        type: String,
        reuired: true
    },
    desc: {
        type: String,
        reuired: true
    },
    imgUrl: {
        type: String
    },
    videoUrl: {
        type: String,
        reuired: true
    },
    likes: {
        type: [String]
    },
    category: {
        type: String
    }
}, {timestamps: true})

export default mongoose.model('Video', VideoSchema)