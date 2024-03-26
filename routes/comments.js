const express = require("express");
const router = express.Router();
const comments = require("../data/comments");
const fs = require('fs');
const path = require("path");


// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Comments Request Time: ", Date.now());
  next();
});

// route for /comment
router
  .route("/")
  .get((req, res) => {
    res.json(comments);
  })
  .post((req, res) => {
    if (req.body.postId && req.body.name && req.body.email && req.body.body) {
        if (comments.find((c) => c.email == req.body.email)) {
            res.json({ error: `One comment per email address.` });
            return;
        }
            const newComment = {
                postId: req.body.postId,
                id: comments[comments.length - 1].id + 1,
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                body: req.body.body
            };
            comments.push(newComment);


        // Read existing posts data
        fs.writeFile(
          path.join(__dirname, "../data/comments.js"),
          `const comments = ${JSON.stringify(
            comments,
            null,
            2
          )};\n\nmodule.exports = comments;`,
          (err) => {
            if (err) {
              console.error("Error writing to comments file:", err);
              return res.status(500).json({ error: "Error adding comment" });
            }
            // Returning the newly added user
            res.json(newComment);
          }
        );
      } else {
        res.json({ error: "Insufficient Data" });
      }
    });

// Route for /comment/ID_OF_COMMENT
router
  .route("/:id")
  .get((req, res, next) => {
    try {
      const comment = comments.find((p) => p.id === parseInt(req.params.id));
      if (!comment) {
        // Comment not found, send 404 response
        return res.status(404).send("Post not found");
      }
      res.json(comment);
    } catch (error) {
      // Handle errors
      console.error(error);
      next(error);
    }
  })
  .delete((req, res) => {
    const commentId = parseInt(req.params.id);
    const index = comments.findIndex(comment => comment.id === commentId);

    if (index === -1) {
      return res.status(404).send("Comment not found");
    }

    // Remove the user from the users array
    const deletedComment = comments.splice(index, 1)[0];

    // Save the updated users array to the file
    fs.writeFile('./data/comments.js', `const comments = ${JSON.stringify(comments, null, 2)};\n\nmodule.exports = comments;`, (err) => {
      if (err) {
        console.error("Error writing to comments file:", err);
        return res.status(500).json({ error: "Error deleting comment" });
      }
      // Return the deleted comment
      res.json(deletedComment);
    });
  });

module.exports = router;
