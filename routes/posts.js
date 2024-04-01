const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getPostsCollection } = require("../mongoDB");
const { getUsersCollection } = require("../mongoDB");


// CREATE - POST a new post
router.post("/", async (req, res) => {
  try {
    const userId = req.body.userId;

    // Check if the user exists befor they are allowed to input a new post.
    const userCollection = getUsersCollection();
    const user = await userCollection.findOne({ id: userId });

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // User exists, we can proceed with creating the post
    const postsCollection = getPostsCollection();
    const newPost = {
      userId: userId,
      id: req.body.id,
      title: req.body.title,
      body: req.body.body
    };
    const result = await postsCollection.insertOne(newPost);
    res.json({ message: "Post inserted successfully" });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// READ - GET all posts
router.get("/", async (req, res) => {
  try {
    const postsCollection = getPostsCollection();
    const posts = await postsCollection.find({}).toArray();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// READ - GET a single post by ID
router.get("/:id", async (req, res) => {
  const objectId = new ObjectId(req.params.id);
  try {
    const postsCollection = getPostsCollection();
    const post = await postsCollection.findOne({ _id: objectId });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// UPDATE - PUT to update a post by ID
router.put("/:id", async (req, res) => {
  const objectId = new ObjectId(req.params.id);
  const newPostTitle = req.body.title; // Use req.body.title to access the title from the request body
  const update = {
    $set: {
      title: newPostTitle,
    },
  };

  try {
    const postsCollection = getPostsCollection();
    const result = await postsCollection.updateOne({ _id: objectId }, update);
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post updated successfully" });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE - DELETE a post by ID
router.delete("/:id", async (req, res) => {
  const objectId = new ObjectId(req.params.id);
  try {
    const postsCollection = getPostsCollection();
    const result = await postsCollection.deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route for /posts/user/ID_OF_USER where posts are filtered by userId
router.route("/user/:userId").get(async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const postsCollection =  getPostsCollection();
    const filteredPosts = await postsCollection.find({ userId }).toArray();

    if (filteredPosts.length === 0) {
      // No posts found for the given userId, send 404 response
      return res.status(404).send("No posts found for the given userId");
    }

    res.json(filteredPosts);
  } catch (error) {
    // Handle errors
    console.error(error);
    next(error);
  }
});

module.exports = router;
