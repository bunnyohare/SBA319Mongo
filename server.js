require("dotenv").config();
const express = require("express");
const app = express();
const port = 5005;
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const cors = require("cors"); // Import the cors module

async function startServer() {
  try {
   // Set up middleware
    app.use(cors()); // Enable CORS for all routes
    const logReq = function (req, res, next) {
      console.log("Request Received");
      next();
    };
    app.use(logReq);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ extended: true }));

    // Set up routes
    app.use("/api/user", userRoutes);
    app.use("/api/post", postRoutes);
    app.use("/api/comment", commentRoutes);

    app.get("/", (req, res) => {
      res.send("Work in progress");
    });

    // Lesson error handling middleware
    app.use((req, res) => {
      res.status(404);
      res.json({ error: `Sorry, resource not found` });
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server listening on port: ${port}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    // Exit process if failed to connect to MongoDB
    process.exit(1);
  }
}

// Call the startServer function
startServer();
