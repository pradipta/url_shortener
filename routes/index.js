const express = require ('express');
const router = express.Router();
const config = require ('config');
//const baseUrl = require ()
const Url = require('../models/url');


//@route        GET /:code
//description   route to actual url

router.get('/:code', async(req, res)=>{
    try {
        const code = req.params.code;
        const baseUrl = config.get('baseUrl');
        const shortUrlToFind = baseUrl +'/'+ code
        const url = await Url.findOne({shortUrl: shortUrlToFind});
        console.log('Code: ', code);
        console.log('url: ', url);
        if(url){
            res.redirect(url.longUrl);
        }else{
            return res.status(404).json('Url not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
});
module.exports = router;