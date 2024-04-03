const express = require("express");
const router = express.Router();
const User = require("../models/user");

function isValidEmail(email) {
  // Regular expression pattern for validating email address format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Test the email against the regex pattern
  return emailRegex.test(email);
}

// CREATE - POST a new user
router.post("/", async (req, res) => {
  try {
    const newEmail = req.body.email;

    // Check if the email address is in the correct format
    if (!isValidEmail(newEmail)) {
      return res.status(400).json({ error: "Invalid email address format" });
    }

     // Find the document with the highest ID
     const highestIdUser = await User.findOne({}, {}, { sort: { 'id': -1 } });

     // Generate a new ID by incrementing the highest ID by 1
     const newId = highestIdUser ? highestIdUser.id + 1 : 1;
     const { name, username, address, geo, phone, website, company } = req.body;

     // Create the new post with the generated ID
      const newUser= new User({
        id: newId,
        name,
        username,
        email: newEmail,
        address,
        geo,
        phone,
        website,
        company
      });
    
    await newUser.save();
    res.json({ message: "User inserted successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// READ - GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// READ - GET a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
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
  try {
    const user = await User.findOneAndUpdate({ id: req.params.id }, req.body);
    if (!user) {
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
  try {
    const user = await User.findOneAndDelete({ id: req.params.id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
