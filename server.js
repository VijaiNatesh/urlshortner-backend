require('dotenv').config()
const express = require('express')
const app = express()
require('./config/dbConnect')();
const cors = require('cors')
const userRoute = require("./routes/userRoute")
const passwordResetRoute = require("./routes/passwordReset")
const urlRoute = require('./routes/urlRoute')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Url Shortner Api")
})
app.use('/api/user', userRoute)
app.use('/api/passwordreset', passwordResetRoute)
app.use('/api/url', urlRoute)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})