const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");

// CREATE - POST a new post
router.post("/", async (req, res) => {
  try {
    // Check if the user exists before allowing them to post
    const newUserId = req.body.userId;
    const user = await User.findOne({id: newUserId});
    if (!user) {
      return res.status(404).json({ error: "User not found. Cannot create post." });
    }
    // Find the document with the highest ID
    const highestIdPost = await Post.findOne({}, {}, { sort: { 'id': -1 } });

    // Generate a new ID by incrementing the highest ID by 1
    const newId = highestIdPost ? highestIdPost.id + 1 : 1;

    // Create the new post with the generated ID
    const newPostData = {
      userId: newUserId,
      id: newId,
      title: req.body.title,
      body: req.body.body,
    };
    const newPost = new Post(newPostData);

    // Save the new post to the database
    await newPost.save();

    res.json({ message: "Post inserted successfully", newPost: newPostData });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// READ - GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// READ - GET a single post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ id: req.params.id });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT - Update a post by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE - Delete a post by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findOneAndDelete({ id: req.params.id });
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route for /posts/user/ID_OF_USER where posts are filtered by userId
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const posts = await Post.find({ userId });
    if (posts.length === 0) {
      return res.status(404).send("No posts found for the given userId");
    }
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
