const { ObjectId } = require("mongodb");
const { getDB } = require("../database/db");

const getAll = async (req, res) => {
  try {
    const db = getDB();
    const contacts = await db.collection("contacts").find().toArray();
    res.json(contacts);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSingle = async (req, res) => {
  try {
    const db = getDB();
    const id = req.params.id;

    const contact = await db
      .collection("contacts")
      .findOne({ _id: new ObjectId(id) });

    res.json(contact);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createContact = async (req, res) => {
  try {
    const db = getDB();

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await db.collection("contacts").insertOne(contact);

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateContact = async (req, res) => {
  try {
    const db = getDB();
    const id = req.params.id;

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await db
      .collection("contacts")
      .replaceOne({ _id: new ObjectId(id) }, contact);

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).send("Contact not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteContact = async (req, res) => {
  try {
    const db = getDB();
    const id = req.params.id;

    const result = await db
      .collection("contacts")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).send("Contact not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};