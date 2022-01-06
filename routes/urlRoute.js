const express = require('express')
const urlRoute = express.Router();
const validUrl = require('valid-url')
const shortid = require('shortid')
const Url = require('../models/Url')

urlRoute.post('/', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = process.env.BASE_URL;

    if (!validUrl.isUri(baseUrl)) {
        throw new Error("Invalid Base URL")
    }

    const urlCode = shortid.generate();

    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });

            if (url) {
                res.json(url);
            } else {
                const shortUrl = baseUrl + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date(),
                });

                await url.save();

                res.json(url);
            }
        } catch (err) {
            console.error(err.message);
            throw new Error('Server Error');
        }

    } else {
        throw new Error('Invalid Long Url');
    }
})

urlRoute.get('/:code', async (req, res) => {
    try {
      const url = await Url.findOne({ urlCode: req.params.code });
  
      if (url) {
        return res.redirect(url.longUrl);
      } else {
        return res.status(404).json('No Url found');
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server Error');
    }
  });

module.exports = urlRoute