const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb"); 
const { check } = require("express-validator");
const async = require('async');

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

router.use("/zipcode/test/ing/", (req, res, next) => {
  const zipcodes = [ 91789, 95126 ];

  // let posts = await Post.find().where('zipcode').in(zipcodes).exec();
  // console.log(posts);
  console.log("Sending request");

  Post.find({
    'zipcode': { $in: zipcodes}
  }, function(err, docs){
    if (err) {
      res.status(500).send(err.message);
      next(err);
    } else {
      console.log(docs);
      req.posts = docs;
      next();
    }
  });
  // res.send(posts);
})

router.use("/zipcode/test/ing/", (req, res, next) => {
  console.log("Testing out middle ware :)");
  next();
})

router.get("/zipcode/test/ing/", (req, res, next) => {
  if (req.posts) {
    console.log("It worked!");

    let results = {
      originalPosts: req.posts,
      formattedPosts: []
    };
    
    async.series([
      // function(callback) {
      //   Post.find({"zipcode": req.zipcode}, (err, posts) => {
      //     if (err) callback(err.message); 
      //     else {
      //       results.originalPosts = posts;
      //       callback();
      //     }
      //   });
      // },
      function(callback) {
        async.forEach(results.originalPosts, function(post, callback) {
          User.findOne({"_id": post.user_id}, function(err, user) {
            if (err) return callback(err);
            let newPost = {
              "firstName": user.firstName,
              "lastName": user.lastName,
              "subject": post.subject,
              "message": post.message,
              "email": post.email,
              "tag": post.tag,
              "zipcode": post.zipcode,
            };
            // console.log(newPost);
            results.formattedPosts.push(newPost);
            callback();
          });
        }, function (err) {
          if (err) return callback(err);
                      callback();
        });
      }
    ], function(err) {
      if (err) return next(err);
      console.log(results.formattedPosts);
      res.send(results.formattedPosts);
    });

  } else {
    console.log("Did not work :((");
    res.send(400).status("Did not work");
  }
})

router.use("/zipcode/:zipcode", (req, res, next) => {
  let zipcode = req.params && req.params.zipcode;
  if (!zipcode || isNaN(zipcode)) {
    res.status(404).send(`Zipcode cannot be found.`);
  }
  req.zipcode = zipcode;

  console.log(`Requesting for zipcode ${req.zipcode}`);

  next();
})

router.get("/zipcode/:zipcode", (req, res, next) => {
  let results = {
    originalPosts: [],
    formattedPosts: []
  };
  
  async.series([
    function(callback) {
      Post.find({"zipcode": req.zipcode}, (err, posts) => {
        if (err) callback(err.message); 
        else {
          results.originalPosts = posts;
          callback();
        }
      });
    },
    function(callback) {
      async.forEach(results.originalPosts, function(post, callback) {
        User.findOne({"_id": post.user_id}, function(err, user) {
          if (err) return callback(err);
          let newPost = {
            "firstName": user.firstName,
            "lastName": user.lastName,
            "subject": post.subject,
            "message": post.message,
            "email": post.email,
            "tag": post.tag,
            "zipcode": post.zipcode,
          };
          // console.log(newPost);
          results.formattedPosts.push(newPost);
          callback();
        });
      }, function (err) {
        if (err) return callback(err);
                    callback();
      });
    }
  ], function(err) {
    if (err) return next(err);
    console.log(results.formattedPosts);
    res.send(results.formattedPosts);
  });
});

module.exports = router;
