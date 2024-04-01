// database.js
require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// Function to connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Function to get the users collection
function getUsersCollection() {
  return client.db("SBA319Mongo").collection("Users");
}

// Function to get the posts collection
function getPostsCollection() {
  return client.db("SBA319Mongo").collection("Posts");
}

// Function to get the posts collection
function getCommentsCollection() {
  return client.db("SBA319Mongo").collection("Comments");
}

module.exports = { connectDB, getUsersCollection, getPostsCollection, getCommentsCollection };
