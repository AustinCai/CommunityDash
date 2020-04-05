const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb"); 
const { check } = require("express-validator");

const Post = require("../database/postModel/Post");
const User = require("../database/model/User");

// Display posts, in server, and welcome message
router.get("/", (req, res, next) => {
  Post.find({}, (err, allPosts) => {
    if (err) {
      res.status(500).send(err.message);
      console.log(err.message);
    } else {
      console.log(allPosts);
      res.send("Welcome to the Forum Database!");
    }
  });
})

// Create new post in posts collection of test database 
// UserId and tag should be supplied by front end
router.post("/post", 
  [
      check("email", "Please enter a valid email").isEmail(),
      check("subject", "Please enter a valid subject").not().isEmpty(),
      check("message", "Please enter a valid message").not().isEmpty(),
      check("location", "Please enter a valid zipcode").not().isEmpty(),
  ],
  (req, res, next) => {
    const {
      user_id,
      subject,
      message,
      email,
      tag,
      zipcode
    } = req.body;
    
    try {
      const post = new Post({
        user_id: new ObjectId(user_id),
        subject,
        message,
        email,
        tag,
        zipcode: parseInt(zipcode, 10)
      });
    
      post.save();
      
      User.updateOne(
        {"_id": post.user_id}, 
        {
          $push: { "forumPosts": post._id }
        },
        (err) => {
        if (err) {
          res.status(500).send(err.message);
          console.log(err.message);
        }
        console.log("Successfully updated user info!");
      });

      res.send(post);
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Error in saving post");
    }
  }
);

// Return postId, userId, and zipcode given tag
router.get("/tag/:tag", (req, res, next) => {
  let tag = req.params.tag;
  Post.find({"tag": tag}, '_id user_id zipcode', (err, posts) => {
    if  (posts.length >= 1) {
      console.log("Found post(s)");
      res.send(posts);
    } else if (err) {
      console.log(err.message);
      res.send(`Posts with tag ${tag} cannot be found.`)
    } else {
      res.status(404).send("Post(s) with tag not found");
    }
  });
});

// Retrieve post from post id
router.get("/post/:id", (req, res, next) => {
  let id = new ObjectId(req.params.id);
  Post.findOne({"_id": id}, (err, post) => {
    if (post && post._id) {
      console.log("Found post");
      res.send(post);
    } else if (err) {
      res.status(500).send(err.message);
      console.log(err.message);
    } else {
      res.status(404).send("Post not found");
    }
  });
})

// Retrieve user given post id
router.get("/post/user/:id", (req, res, next) => {
  let id = new ObjectId(req.params.id);
  Post.findOne({"_id": id}, (err, post) => {
    if (post && post._id) {
      console.log("Found post");
      const {user_id} = post;

      User.findOne({"_id": user_id}, (err, user) => {
        if (user) {
          console.log("Found user");
          res.send(user);
        } else if (err) {
          res.status(500).send(err.message);
          console.log(err.message);
        } else {
          console.log("User not found");
          res.status(404).send("User not found");
        }
      });

    } else if (err) {
      res.status(500).send(err.message);
      console.log(err.message);
    } else {
      res.status(404).send("Post not found");
    }
  });
})


module.exports = router;
