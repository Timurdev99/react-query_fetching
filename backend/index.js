require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const api = require("./api");

const app = express();
const port = process.env.PORT | 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", api);

app.listen(port, () => {
  console.log(`Server is starting at port ${port}.`);
});
