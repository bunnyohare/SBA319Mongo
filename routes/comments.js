const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const Post = require("../models/post");

function isValidEmail(email) {
  // Regular expression pattern for validating email address format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Test the email against the regex pattern
  return emailRegex.test(email);
}

// CREATE - POST a new comment
router.post("/", async (req, res) => {
  try {
    // Check if the post exists before allowing them to comment on it.
    const newPostId = req.body.postId;
    const post = await Post.findOne({id: newPostId});
    if (!post) {
      return res.status(404).json({ error: "Post not found. Cannot create comment." });
    }
    const newEmail = req.body.email;
    // Check if the email address is in the correct format
    if (!isValidEmail(newEmail)) {
      return res.status(400).json({ error: "Invalid email address format" });
    }
    // Find the document with the highest ID
    const highestIdComment = await Comment.findOne(
      {},
      {},
      { sort: { id: -1 } }
    );
    // Generate a new ID by incrementing the highest ID by 1
    const newId = highestIdComment ? highestIdComment.id + 1 : 1;
    // Create the new post with the generated ID
    const newCommentData = {
      postId: newPostId,
      id: newId,
      name: req.body.name,
      email: newEmail,
      body: req.body.body,
    };
    const newComment = new Comment(newCommentData);
    await newComment.save();
    res.json({ message: "Comment inserted successfully" });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// READ - GET all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// READ - GET a single comment by ID
router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findOne({ id: req.params.id });
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(comment);
  } catch (error) {
    console.error("Error fetching comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT - Update a comment by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedComment = await Comment.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json({ message: "Comment updated successfully", comment: updatedComment });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE - DELETE a comment by ID
router.delete("/:id", async (req, res) => {
  try {
    await Comment.findOneAndDelete({ id: req.params.id });
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
