import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router();


//register
router.post('/register', async (req,res,next) => {
    const {username, email, password, profilePicture} = req.body;
    try {
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            email,
            password: hashedPassword, 
            username: username,
            img: profilePicture
        });
        
        res.status(200).json(newUser)
    } catch (error) {
        next(error)
    }
} )


//login
router.post('/login', async (req,res,next) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if(!user) return res.status(404).json('User does not exist')
        const isPassowrdCorrect = await bcrypt.compare(password, user.password)
        if(!isPassowrdCorrect) return res.status(404).json('Invalid Credentials');

        const accessToken = jwt.sign({email: user.email, id: user._id}, secret, {expiresIn: '10h'});
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})






export default router