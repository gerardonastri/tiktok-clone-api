import express from 'express'
import Comment from '../models/Comment.js';

const router = express.Router();


//create comment
router.post('/:postId', async (req,res, next) => {
    const {postId} = req.params
    const {userId} = req.query
    const {desc} = req.body
    try {
        const comment = await Comment.create({
            postId,
            userId,
            desc
        })
        res.status(200).json(comment)
    } catch (error) {
        next(error)
    }
})

//get comments of a post
router.get('/:postId', async (req,res,next) => {
    const {postId} = req.params
    try {
        const comments = await Comment.find({postId: postId})
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
})





export default router