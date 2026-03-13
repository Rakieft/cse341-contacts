require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { connectDB } = require("./database/db");
const contactRoutes = require("./routes/contacts");

const app = express();
const port = process.env.PORT || 8080;

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

app.use(cors());
app.use(express.json());

connectDB();

app.use("/contacts", contactRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contacts API",
      version: "1.0.0",
      description: "Contacts API for CSE341"
    },
    servers: [
      {
        url: "https://cse341-contacts-8bwb.onrender.com"
      }
    ]
  },
  apis: ["./routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));