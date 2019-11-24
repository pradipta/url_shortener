const express = require ('express');
const router = express.Router();
const validUrl = require ('valid-url');
const config = require ('config');
const shortid = require ('shortid');

const Url = require('../models/url');

// @route        POST /api/url/shorten
// Description   shortens your URL

router.post('/shorten', async (req, res)=> {
    const {
        longUrl
    } = req.body;
    const baseUrl = config.get('baseUrl');

    //check base URL
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL');
    }

    const urlCode = shortid.generate();

    if (validUrl.isUri(longUrl)) {
        //return res.status(404).json('Invalid URL entered');
        try {
            let url = await Url.findOne({ longUrl });
            if (url) {
                res.json(url);
            }else{
                const shortUrl = baseUrl +'/'+ urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
            }
        } catch (error) {
            console.error(error);
            res.status(500).json('Server error');
        }
    }else{
        res.status(401).json('Invalid long url');
    }
});


module.exports = router; 