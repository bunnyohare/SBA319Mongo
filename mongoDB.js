require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGO_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
connectDB().catch(console.dir);

async function fetchDataFromDatabase() {
  try {
    await client.connect();
    console.log("Connected to the database");

    const database = client.db("SBA319Mongo");
    const collection = database.collection("Users");

    // Query for documents
    const query = { username: "Bret" };
    const options = {};
    const result = await collection.find(query, options).toArray();

    await client.close();
    console.log("Retrieved documents:", result);
    return result; // Return the retrieved documents if needed
  } catch (error) {
    console.error("Error fetching data from the database:", error);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

module.exports = { connectDB, fetchDataFromDatabase };
