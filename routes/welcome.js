const express = require ('express');
const router = express.Router();

//@route        GET /
//description   route to actual url

router.get('/', function(req, res){
    //sends response to client or browser
    res.send("Welcome to ShortURL");
});
module.exports = router;