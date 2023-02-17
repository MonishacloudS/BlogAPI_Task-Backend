const mongoose = require('mongoose');

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    collections: {
        type: Array,
        required: false
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true });



module.exports = mongoose.model('Post', postSchema);
