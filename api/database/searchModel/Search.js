const mongoose = require('mongoose');
const mongoolia = require('mongoolia').default;

// Pass `{algoliaIndex: true}` to push theses attributes for indexing to Algolia
const SearchSchema = new mongoose.Schema({
  // title: { type: String, required: true, algoliaIndex: true },
  // author: { type: String, required: true, algoliaIndex: true },
  // description: { type: String, required: true, algoliaIndex: true }
    subject: {
        type: String,
        required: true,
        algoliaIndex: true
    },
    message: {
        type: String,
        required: true,
        algoliaIndex: true
    },
    email: {
        type: String,
        required: true,
        algoliaIndex: true
    },
    tag: {
        type: String,
        required: true,
        algoliaIndex: true
    },
    zipcode: {
        type: Number,
        required: true,
        algoliaIndex: true
    }
});

// Specify your Algolia credentials which you can find into your dashboard
SearchSchema.plugin(mongoolia, {
  appId: 'P9PI0KY6JX',
  apiKey: '66b34ed37edc7f95dce0eec05df68e9e',
  indexName: 'test_1'
})

module.exports = mongoose.model("search", SearchSchema);
