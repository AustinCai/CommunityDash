const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const PostSchema = mongoose.Schema({
    user_id: {
        type: ObjectId,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    zipcode: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("post", PostSchema);