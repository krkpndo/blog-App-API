const Blog = require('../models/Blog')
const { errorHandler } = require("../auth.js");

module.exports.addBlog = (req, res) => {
    let newBlog = new Blog({
        title : req.body.title,
        content : req.body.content,
        author : req.user.username
    });

    return Blog.findOne({title: req.body.title}).then(existingBlog=> {

        if(existingBlog){

            return res.status(409).send({ message:'Blog post already exists' });
        } else{

            return newBlog.save().then(result => res.status(201).send({
                result
            })).catch(error => errorHandler(error, req, res));
        }
    })
    .catch(error => errorHandler(error, req, res));
}; 

module.exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.blogId);

        if (!blog) {
            return res.status(404).send({ message: 'No blog found' });
        }

        if (blog.author !== req.user.username) {
            return res.status(403).send({ message: 'You are not authorized to update this blog' });
        }

        const updatedBlog = {
            title: req.body.title,
            content: req.body.content,
        };

        const updated = await Blog.findByIdAndUpdate(req.params.blogId, updatedBlog, { new: true });

        return res.status(200).send({
            message: 'Blog updated successfully',
            updatedBlog: updated,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'An error occurred while updating the blog' });
    }
};


module.exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.blogId);

        if (!blog) {
            return res.status(404).send({ message: "Blog not found" });
        }
        if (blog.author !== req.user.username && req.user.isAdmin !== true) {
            return res.status(403).send({ message: "You are not authorized to delete this blog" });
        }

        await Blog.findByIdAndDelete(req.params.blogId);

        return res.status(200).send({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return res.status(500).send({ error: "An error occurred while deleting the blog" });
    }
};


module.exports.getAllBlogs = (req, res) => {
    Blog.find({})
    .then(result => {
        res.status(200).send(result);
    })
}


module.exports.getMyBlogs = (req, res) => {
    Blog.find({ author: req.user.username })
        .then(result => {
            console.log(result);
            res.status(200).send(result);
        })
}

module.exports.viewBlog = (req, res) => {
    console.log(req.params.blogId)
    Blog.findById(req.params.blogId )
        .then(result => {
            console.log(result);
            res.status(200).send(result);
        })
}
