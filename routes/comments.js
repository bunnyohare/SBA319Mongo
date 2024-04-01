const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getCommentsCollection } = require("../mongoDB");


// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Comments Request Time: ", Date.now());
  next();
});

// CREATE - POST a new comment
router.post("/", async (req, res) => {
  try {
    const commentsCollection = getCommentsCollection();
    const newComment = {
      postId: req.body.postId,
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      body: req.body.body
    };
    const result = await commentsCollection.insertOne(newComment);
    res.json({ message: "Comment inserted successfully" });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// READ - GET all comments
router.get("/", async (req, res) => {
  try {
    const commentsCollection = getCommentsCollection();
    const comments = await commentsCollection.find({}).toArray();
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// READ - GET a single comment by ID
router.get("/:id", async (req, res) => {
  const objectId = new ObjectId(req.params.id);
  try {
    const commentsCollection = getCommentsCollection();
    const comment = await commentsCollection.findOne({ _id: objectId });
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(comment);
  } catch (error) {
    console.error("Error fetching comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// UPDATE - PUT to update a comment by ID
router.put("/:id", async (req, res) => {
  const objectId = new ObjectId(req.params.id);
  const newCommentName = req.body.name; // Use req.body.name to access the name from the request body
  const update = {
    $set: {
      name: newCommentName,
    },
  };

  try {
    const commentsCollection = getCommentsCollection();
    const result = await commentsCollection.updateOne({ _id: objectId }, update);
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json({ message: "Comment updated successfully" });
  } catch (error) {
    console.error("Error updating Comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// DELETE - DELETE a comment by ID
router.delete("/:id", async (req, res) => {
  const objectId = new ObjectId(req.params.id);
  try {
    const commentsCollection = getCommentsCollection();
    const result = await commentsCollection.deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting Comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
