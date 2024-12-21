const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is Required']
    },
    content: {
        type: String,
        required: [true, 'content is Required']
    },
    author: {
        type: String,
        required: [true, 'author information is Required']
    },
    comments: [
        {
            userId: {
                type: String,
                required: [true, 'user ID is Required']
            },
            comment: {
                type: String,
                required: [true, 'comment is Required']
            }
        }
    ],

    createdON: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Blog', blogSchema);