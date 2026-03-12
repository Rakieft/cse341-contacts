require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { connectDB } = require("./database/db");
const contactRoutes = require("./routes/contacts");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/contacts", contactRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});