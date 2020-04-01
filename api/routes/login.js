var express = require("express");
var router = express.Router();
var multer = require("multer");
var upload = multer();

let accounts = [];
let accountId = 0;

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

router.use(upload.array());
router.post("/", (req, res, next) => {
  // console.log(req.body.username, req.body.password);
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

// router.post("/", function(req, res, next) {
//   const receivedInfo = checkLogin(req.query);
//   if (receivedInfo !== -1) {
//     accounts.push(receivedInfo);
//     res.status(201).send(receivedInfo);
//     console.log("success");
//     console.log(accounts);
//   } else {
//     res.status(400).send();
//   }
// });

module.exports = router;
