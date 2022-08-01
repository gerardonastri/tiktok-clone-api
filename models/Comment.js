import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    userId: {
        type: String,
        reuired: true
    },
    postId: {
        type: String,
        reuired: true
    },
    desc: {
        type: String,
        reuired: true
    },
    
}, {timestamps: true})

export default mongoose.model('Comment', CommentSchema)