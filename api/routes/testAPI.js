<<<<<<< HEAD
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('API is working properly. Hello world from Austin!');
});

module.exports = router;
=======
var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send("API is working properly");
});

module.exports = router;
>>>>>>> 01f986de382b29b99ccd30cfd706c38d2cd03fc2
