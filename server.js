const express = require("express");
const { runDB } = require('./mongoDB');
const app = express();
const port = 5005;
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const cors = require("cors"); // Import the cors module


app.use(cors()); // Enable CORS for all routes

const logReq = function (req, res, next) {
  console.log("Request Received");
  next();
};

app.use(logReq);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.get("/", (req, res) => {
  res.send("Work in progress");
});

// Lesson error handling middleware
app.use((req, res) => {
  res.status(404);
  res.json({ error: `Sorry, resource not found` });
});


app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
