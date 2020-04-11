const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const async = require('async');

const Post = require("../database/postModel/Post");
const User = require("../database/model/User");
const Search = require("../database/searchModel/Search")

// Instantiate an Algolia client
const algoliasearch = require('algoliasearch');
const algoliaClient = algoliasearch('P9PI0KY6JX', '66b34ed37edc7f95dce0eec05df68e9e');
const index = algoliaClient.initIndex('test_1');

// Add the search endpoint
router.post('/', (req, res, next) => {
  try {
    const requests = req.body;
    console.log(requests);
    console.log(req.body.query);
    results = index.search(req.body.query).then(({ hits }) => {
      console.log(hits);
    });
    res.status(200).send(results);
  } catch(e) {
    console.log(e.message);
    res.status(500).send("Error in search");
  }
});

module.exports = router;
