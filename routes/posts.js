const express = require("express");
const router = express.Router();
const posts = require("../data/posts");
const fs = require('fs');
const path = require("path");

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Posts Request Time: ", Date.now());
  next();
});

// Route for /post
router
  .route("/")
  .get((req, res) => {
    res.json(posts);
  })
  .post((req, res) => {
    if (req.body.userId && req.body.title && req.body.content) {
        if (posts.find((p) => p.title == req.body.title)) {
            res.json({ error: `Title already taken` });
            return;
        }
            const newPost = {
                id: posts[posts.length - 1].id + 1,
                userId: req.body.userId,
                title: req.body.title,
                content: req.body.content,
            };
            posts.push(newPost);


        // Read existing posts data
        fs.writeFile(
          path.join(__dirname, "../data/posts.js"),
          `const posts = ${JSON.stringify(
            posts,
            null,
            2
          )};\n\nmodule.exports = posts;`,
          (err) => {
            if (err) {
              console.error("Error writing to posts file:", err);
              return res.status(500).json({ error: "Error adding post" });
            }
            // Returning the newly added user
            res.json(newPost);
          }
        );
      } else {
        res.json({ error: "Insufficient Data" });
      }
    });

// Route for /post/ID_OF_POST
router
  .route("/:id")
  .get((req, res, next) => {
    try {
      const post = posts.find((p) => p.id === parseInt(req.params.id));
      if (!post) {
        // Post not found, send 404 response
        return res.status(404).send("Post not found");
      }
      res.json(post);
    } catch (error) {
      // Handle errors
      console.error(error);
      next(error);
    }
  })
  .delete((req, res) => {
    const postId = parseInt(req.params.id);
    const index = posts.findIndex(post => post.id === postId);

    if (index === -1) {
      return res.status(404).send("Post not found");
    }

    // Remove the post from the posts array
    const deletedPost = posts.splice(index, 1)[0];

    // Save the updated posts array to the file
    fs.writeFile('./data/posts.js', `const posts = ${JSON.stringify(posts, null, 2)};\n\nmodule.exports = posts;`, (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return res.status(500).json({ error: "Error deleting post" });
      }
      // Return the deleted post
      res.json(deletedPost);
    });
  });
// Route for /posts/user/ID_OF_USER where posts are filtered by userId
router.route("/user/:userId").get((req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const filteredPosts = posts.filter((post) => post.userId === userId);
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
