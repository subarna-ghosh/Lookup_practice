require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/config/db");
db();

app.use(
  cors({
    origin: "http://localhost:3002",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const api = require("./app/routes");
app.use(api);

const port = 3002;
app.listen(port, () => {
  console.log(`server is running on port no-->http://localhost:${port}`);
});
