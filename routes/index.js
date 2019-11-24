const express = require ('express');
const router = express.Router();

const Url = require('../models/url');


//@route        GET /:code
//description   route to actual url

router.get('/:code', async(req, res)=>{
    try {
        const code = req.params.code;
        const url = await Url.findOne({urlCode: code});
        console.log('Code: ', code);
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