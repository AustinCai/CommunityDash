const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb"); 

const Post = require("../database/postModel/Post");

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

  //Add validator here
  
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
  Post.find({"tag": tag}, 'user_id', (err, posts) => {
    if (err) {
      console.log(err.message);
      res.send(`Posts with tag ${tag} cannot be found.`)
    }
    res.send(posts);
  })
})

router.get("/post/:id", (req, res, next) => {
  let id = new ObjectId(req.params.id);
  console.log(`Results for id: ${id}`);
  Post.find({"_id": id}, (err, post) => {
    if (err) {
      res.status(500).send(err.message);
      console.log(err.message);
    } else if (post) {
      res.send(post);
    } else {
      res.status(404).send("Post not found");
    }
  });
})

module.exports = router;
