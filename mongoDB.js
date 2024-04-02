require("dotenv").config();
const mongoose = require("mongoose");
const Users = require("./models/user"); // Import the User model

const uri = process.env.MONGO_URI;

// Connect to MongoDB using Mongoose
mongoose
  .connect(uri)
  .then(async () => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Terminate the process if unable to connect to MongoDB
  });

// Event listener for connection error
mongoose.connection.on("error", (error) => {
  console.error("Error connecting to MongoDB:", error);
  process.exit(1); // Terminate the process if unable to connect to MongoDB
});

module.exports = mongoose; // Export the mongoose instance
