const {User} = require('../models/User')
const Token = require('../models/Token')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const Joi = require('joi')
const express = require('express')
const passwordResetRoute = express.Router()

passwordResetRoute.post('/', async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email})
    if(!user){
        res.send("Email not registered")
    }
    let token = await Token.findOne({userId: user._id})
    if(!token){
        token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        })
        token.save()       
    }
    const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);
     res.send(link)   
    }
    catch(error){
        console.log(error)
        res.send("Error Occured")
    }
})

passwordResetRoute.post('/:userId/:token', async(req, res) => {
    try{
        const user = await User.findById(req.params.userId)
        if(!user){
            res.send("Invalid Link or Expired Link")
        }
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        })
        if(!token){
            res.send("Invalid Link or Expired Link")
        }
        user.password = req.body.password;
        await user.save();
        await token.delete();
        
        res.send("password reset sucessfully.");
    }
    catch(error){
        console.log(error)
        res.send("Error Occured")
    }
})

module.exports = passwordResetRoute
