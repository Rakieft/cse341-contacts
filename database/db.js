const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

let database;

const connectDB = async () => {
  try {
    await client.connect();
    database = client.db("cse341");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};

const getDB = () => database;

module.exports = { connectDB, getDB };