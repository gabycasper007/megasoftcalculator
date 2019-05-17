const express = require("express");
const equalController = require("./controllers/equal");
const historyController = require("./controllers/history");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const DB_USER = process.env.DB_USER || "gabriellvasile";
const DB_NAME = process.env.DB_NAME || "calculator";
const DB_PASSWORD = process.env.DB_PASSWORD || "1zZM2cEN0QyxmopR";
const dbLink =
  process.env.DB_CONNECTION_STRING ||
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@mongotut-sxsgb.mongodb.net/${DB_NAME}?retryWrites=true`;

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, "../build")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(bodyParser.json());

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  res.status(status).json({ message: error.message, data: error.data });
});

// Routes
app.post("/equal", equalController.send);
app.put("/history", historyController.save);
app.get("/history", historyController.get);

mongoose
  .connect(dbLink, { useNewUrlParser: true })
  .then(() => {
    app.listen(port);
  })
  .catch(error => {
    console.log(error);
  });
