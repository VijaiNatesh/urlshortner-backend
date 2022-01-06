const User = require("../models/User")
const express = require('express')
const userRoute = express.Router()

userRoute.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body)
        user.save()
        res.json(user)
    }
    catch (error) {
        res.send("An error Occured")
        console.log(error)
    }
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

module.exports = userRoute
