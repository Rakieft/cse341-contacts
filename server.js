const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);

let contactsCollection;

// connecter à MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("cse341");
    contactsCollection = db.collection("contacts");
  } catch (error) {
    console.error(error);
  }
}

connectDB();


// ROUTES

// test route
app.get("/", (req, res) => {
  res.send("Contacts API running");
});

// GET all contacts
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await contactsCollection.find().toArray();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET one contact
app.get("/contacts/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const contact = await contactsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});