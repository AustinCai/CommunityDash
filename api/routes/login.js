var express = require("express");
var router = express.Router();
var multer = require("multer");
var upload = multer();

router.use(upload.array());

let accounts = [];
let accountId = 0;

router.get("/", (req, res, next) => {
  res.send(accounts.map(acc => acc.username));
})


function checkLogin(query){
  if (query.username && query.password){
    return {
      id: accountId++,
      username: query.username,
      password: query.password
    };
  } else {
    return -1;
  }
}


router.post("/", (req, res, next) => {
  const receivedInfo = checkLogin(req.body);
  if (receivedInfo !== -1) {
    accounts.push(receivedInfo);
    res.status(201).send(receivedInfo);
    console.log("success");
    console.log(accounts);
  } else {
    res.status(404).send();
  }
});


module.exports = router;
