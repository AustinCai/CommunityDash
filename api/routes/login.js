var express = require("express");
var router = express.Router();

let accounts = [];

function checkLogin(query){
  if (query.username && query.password){
    return query;
  } else {
    return -1;
  }
}

router.post("/", function(req, res, next) {
  const receivedInfo = checkLogin(req.query);
  if (receivedInfo !== -1) {
    accounts.push(receivedInfo);
    res.status(201).send(receivedInfo);
    console.log("success");
    console.log(accounts);
  } else {
    res.status(400).send();
  }
});

module.exports = router;
