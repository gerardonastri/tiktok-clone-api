import express from 'express'
import Post from '../models/Post.js'

const router = express.Router()

//create a post 
router.post('/',  async (req,res,next) =>{
    try {
        const post = await Post.create(req.body)
        res.status(200).send(post)
    } catch (error) {
        next(error)
    }
})



//get a post
router.get('/find/:id', async (req,res,next) =>{
    const {id} = req.params
    try {
        const post = await Post.findById(id)
        res.status(200).send(post)
    } catch (error) {
        next(error)
    }
})
//get  posts
router.get('/', async (req,res,next) =>{
    try {
        const posts = await Post.aggregate([{$sample: {size: 40}}])
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
})



//get by category
router.get('/category',  async (req,res,next) =>{
    const {cat} = req.query
    try {
        const posts = await Post.find({category: cat}).limit(40)
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
})

//get by user
router.get('/user',  async (req,res,next) =>{
    const {userId} = req.query
    try {
        const posts = await Post.find({userId: userId}).limit(40)
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
})

//get by like
router.get('/like',  async (req,res,next) =>{
    const {userId} = req.query
    try {
        const posts = await Post.find({likes: {$in: [userId]}}).limit(40)
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
})



//search
router.get('/search',  async (req,res,next) =>{
    const query = req.query.q;
    try {
      const posts = await Post.find({
        title: { $regex: query, $options: "i" },
      }).limit(40);
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
})

export default router