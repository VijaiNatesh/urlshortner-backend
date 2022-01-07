const User = require("../models/User")
const express = require('express')
const userRoute = express.Router()

userRoute.post('/register', async (req, res) => {
        const {name, email, password} = req.body;   
        const userExists = await User.findOne({email: email})    
        if(userExists){
           res.send("User Already Exists")
        }
        const user = await User.create({name, email, password})
        user.save()
        res.send("User Registered Successfully")

    
})

userRoute.post('/login', async (req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (user && (await user.isPasswordMatch(password))) {
        res.send("Successfully Logged In")
    }
    else {
        res.send('Invalid Login Credentials')
    }
})

userRoute.get('/details', async(req, res) => {
    const user = await User.find()
    res.send(user)
})

module.exports = userRoute
