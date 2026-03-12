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

module.exports = {
  getAll,
  getSingle
};