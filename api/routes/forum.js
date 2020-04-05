const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb"); 

const Post = require("../database/postModel/Post");

const User = require("../database/model/User");


// Display posts, in server, and welcome message
router.get("/", (req, res, next) => {
  // res.send("Welcome to the Forum Database!");
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
router.post("/post", (req, res, next) => {
  const {
    user_id,
    subject,
    message,
    email,
    tag,
    location
  } = req.body;

  //#TODO: Add validator here
  
  try {
    const post = new Post({
      user_id: new ObjectId(user_id),
      subject,
      message,
      email,
      tag,
      location: parseInt(location,10)
    });
  
    post.save();
    
    //#TODO: Add this post to user's list of posts

    res.send(post);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error in saving post");
  }
});

// Return postId, userId, and location given tag
router.get("/tag/:tag", (req, res, next) => {
  let tag = req.params.tag;
  console.log(`Results for tag: ${tag}`);
  Post.findOne({"tag": tag}, '_id user_id location', (err, posts) => {
    if  (!posts) {
      res.status(404).send("Post(s) with tag not found");
    } else if (err) {
      console.log(err.message);
      res.send(`Posts with tag ${tag} cannot be found.`)
    } else {
      res.send(posts);
    }
  })
})

// Retrieve post from post id
router.get("/post/:id", (req, res, next) => {
  let id = new ObjectId(req.params.id);
  console.log(`Results for post id: ${id}`);
  Post.findOne({"_id": id}, (err, post) => {
    if (post && post._id) {
      console.log("Post: ", post);
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
  console.log(`Results for user id: ${id}`);
  User.findOne({"_id": id}, (err, user) => {
    if (user) {
      console.log("User: ",user);
      res.send(user);
    } else if (err) {
      res.status(500).send(err.message);
      console.log(err.message);
    } else {
      console.log("User not found");
      res.status(404).send("User not found");
    }
  });
})


module.exports = router;
