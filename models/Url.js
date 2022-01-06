const mongoose = require('mongoose')
const conn = mongoose.createConnection(process.env.MONGO_URL)

const UrlSchema = new mongoose.Schema({
    urlCode: {
        type: String,
      },
      longUrl: {
        type: String,
        required: true,
      },
      shortUrl: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        default: Date.now,
      }    
})

const Url = conn.model("Url", UrlSchema)

module.exports = Url