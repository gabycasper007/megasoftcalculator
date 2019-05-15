const express = require("express");
const controller = require("./controllers/equal");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

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

app.post("/equal", controller.equal);

app.listen(port);
