require("dotenv").config();
const express = require("express");
const app = express();
const port = 5005;
const cors = require("cors");
const mongoose = require("./mongoDB"); // Importing mongoose

// Import Mongoose models
const User = require("./models/user");
const Post = require("./models/post");
const Comment = require("./models/comment");

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the directory for views
app.set("views", "./views");

// Middleware
app.use(cors());
app.use(express.json()); // Add this line to enable JSON body parsing

// Import routes
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

// Use routes
app.use("/api/user", usersRouter);
app.use("/api/post", postsRouter);
app.use("/api/comment", commentsRouter);

// Define route handler for the index page
app.get("/", async (req, res) => {
  try {
    // Fetch users, posts, and comments data from Mongoose models
    const users = await User.find();
    const posts = await Post.find();
    const comments = await Comment.find();

    // Render the index page and pass users, posts, and comments data to the view template
    res.render("index", { users: users, posts: posts, comments: comments });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({ error: `Sorry, resource not found` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
