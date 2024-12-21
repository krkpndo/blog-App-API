const express = require("express");
const blogController = require('../controllers/blog.js');
const { verify } = require("../auth.js");

const router = express.Router(); 

router.post("/addPost", verify, blogController.addBlog);

router.patch("/updateBlog/:blogId", verify, blogController.updateBlog);

router.get("/getAllBlogs", verify, blogController.getAllBlogs);

router.delete("/deleteBlog/:blogId", verify, blogController.deleteBlog);

router.get("/getMyBlogs", verify, blogController.getMyBlogs);

router.get("/viewBlog/:blogId", verify, blogController.viewBlog);


module.exports = router;
