const express = require("express");
const app = express();
const cors = require("cors");
const rotasAPI = require("./src/routes/index");

app.use(cors());
app.use((req, res, next) => {
  console.log(`[LOG] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.use("/api", rotasAPI);

module.exports = app;
