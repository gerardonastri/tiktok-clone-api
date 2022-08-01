import express from 'express'
import User from '../models/User.js'
import Post from '../models/Post.js'

const router = express.Router();

//update user
router.put('/:id', async (req,res,next) =>{
    const {id} = req.params
    try {
        const user = await User.findByIdAndUpdate(id, req.body)
        res.status(200).json('User updated')
    } catch (error) {
        next(error)
    }
})


//delete user
router.delete('/:id',   async (req,res,next) => {
    const {id} = req.params
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json('User deleted')
    } catch (error) {
        next(error)
    }
})

//get a user
router.get('/find/:id', async (req,res,next) =>{
    const {id} = req.params
    try {
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})

//get random users
router.get('/rand', async (req,res,next) =>{
    try {
        const users = await User.aggregate([{$sample: {size: 3}}])
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
})



//like a post
router.put('/like/:postId',  async (req,res,next) =>{
    const {postId} = req.params
    const {userId} = req.query
    try {
        const post = await Post.findByIdAndUpdate(postId, {
            $addToSet: {likes: userId},
            $pull: {dislikes: userId}
        })
        res.status(200).json('Liked the post')
    } catch (error) {
        next(error)
    }
})


//dislike a post
router.put('/dislike/:postId', async (req,res,next) =>{
    const {postId} = req.params
    const {userId} = req.query
    try {
        const post = await Post.findByIdAndUpdate(postId, {
            $addToSet: {dislikes: userId},
            $pull: {likes: userId}
        })
        res.status(200).json('Disliked the post')
    } catch (error) {
        next(error)
    }
})



export default router