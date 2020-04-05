const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {ObjectId} = require("mongodb");

const User = require("../database/model/User");
const auth = require("../middleware/auth");

// Check that '\user' path is accessible
router.get("/signup", (req, res, next) => {
  res.send("signup router success");
})

// Create new user and add to `users` collection, responding with token
router.post(
    "/signup",
    [
        // check("username", "Please Enter a Valid Username").not().isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        }),
        check("firstName", "Please Enter a valid first name").not().isEmpty(),
        check("lastName", "Please Enter a valid last name").not().isEmpty(),
        check("zipcode", "Please Enter a zipcode").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            email,
            password,
            firstName,
            lastName,
            zipcode
        } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new User({
                email,
                password,
                firstName,
                lastName,
                zipcode
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

// Authenticate user given email and password, responding with a secure token
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "secret",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

// Authenticates secure token in header and responds with user information
router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

// Retrieve user information given user ObjectId, omitting password
router.get("/whoami/:id", (req, res, next) => {
  let id = new ObjectId(req.params.id);
  User.findOne({"_id": id}, {"password": 0}, (err, user) => {
    if (user && user._id) {
      console.log("Found user!")
      res.send(user);
    } else if (err) {
      res.status(500).send(err.message);
      console.log(err.message);
    } else {
      res.status(404).send("User not found");
    }
  });
});

module.exports = router;
