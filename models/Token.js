const mongoose = require('mongoose')
const conn = mongoose.createConnection(process.env.MONGO_URL)

const TokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    }
})

const Token = conn.model("Token", TokenSchema )
module.exports = Token