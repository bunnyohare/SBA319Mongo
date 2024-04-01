const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getUsersCollection } = require("../mongoDB");

// Simple email validation using regular expression
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// CREATE - POST a new user
router.post("/", async (req, res) => {
  try {
    const newUser = req.body;

    // Validate email format
    if (!isValidEmail(newUser.email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    const usersCollection = getUsersCollection();
    const result = await usersCollection.insertOne(newUser);
    res.json({ message: "User inserted successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// READ - GET all users
router.get("/", async (req, res) => {
  try {
    const usersCollection = getUsersCollection();
    const users = await usersCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// READ - GET a single user by ID
router.get("/:id", async (req, res) => {
  const objectId = new ObjectId(req.params.id);
  try {
    const usersCollection = getUsersCollection();
    const user = await usersCollection.findOne({ _id: objectId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// UPDATE - PUT to update a user by ID
router.put("/:id", async (req, res) => {
  const objectId = new ObjectId(req.params.id);
  const newUserName = req.body.username; // Use req.body.username to access the username from the request body
  const update = {
    $set: {
      username: newUserName,
    },
  };

  try {
    const usersCollection = getUsersCollection();
    const result = await usersCollection.updateOne({ _id: objectId }, update);
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// DELETE - DELETE a user by ID
router.delete("/:id", async (req, res) => {
  const objectId = new ObjectId(req.params.id);
  try {
    const usersCollection = getUsersCollection();
    const result = await usersCollection.deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
