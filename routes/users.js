const express = require("express");
const router = express.Router();
const users = require("../data/users");
const fs = require("fs");
const path = require("path");

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("User Request Time: ", Date.now());
  next();
});

// Route for /user
router
  .route("/")
  .get((req, res) => {
    res.json(users);
  })
  .post((req, res) => {
    if (req.body.name && req.body.username && req.body.email) {
      if (users.find((u) => u.username == req.body.username)) {
        res.json({ error: `Username already taken` });
        return;
      }

      const newUser = {
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };

      users.push(newUser);
      // Writing the updated users array back to the file
      fs.writeFile(
        path.join(__dirname, "../data/users.js"),
        `const users = ${JSON.stringify(
          users,
          null,
          2
        )};\n\nmodule.exports = users;`,
        (err) => {
          if (err) {
            console.error("Error writing to users file:", err);
            return res.status(500).json({ error: "Error adding user" });
          }
          // Returning the newly added user
          res.json(newUser);
        }
      );
    } else {
      res.json({ error: "Insufficient Data" });
    }
  });

// Route for /user/ID_OF_USER
router
  .route("/:id")
  .get((req, res, next) => {
    try {
      const user = users.find((u) => u.id === parseInt(req.params.id));
      if (!user) {
        // User not found, send 404 response
        return res.status(404).send("User not found");
      }
      res.json(user);
    } catch (error) {
      // Handle errors
      console.error(error);
      next(error);
    }
  })

  .delete((req, res) => {
    const userId = parseInt(req.params.id);
    const index = users.findIndex((user) => user.id === userId);

    if (index === -1) {
      return res.status(404).send("User not found");
    }

    // Remove the user from the users array
    const deletedUser = users.splice(index, 1)[0];

    // Save the updated users array to the file
    fs.writeFile(
      "./data/users.js",
      `const users = ${JSON.stringify(
        users,
        null,
        2
      )};\n\nmodule.exports = users;`,
      (err) => {
        if (err) {
          console.error("Error writing to users file:", err);
          return res.status(500).json({ error: "Error deleting user" });
        }
        // Return the deleted user
        res.json(deletedUser);
      }
    );
  });

module.exports = router;
