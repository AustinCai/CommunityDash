var express = require("express");
var router = express.Router();

let buttonPress = 0;

router.get("/", function(req, res, next) {
    buttonPress++;
    res.send(`Button has been pressed ${buttonPress} time(s)!`);
});

module.exports = router;
