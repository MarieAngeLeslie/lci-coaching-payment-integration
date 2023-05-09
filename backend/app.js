const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

const app = express();
const port = 3000;

app
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  })
  .use(morgan("dev"))
  .use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("yeah i'm there");
});

sequelize.initDb();

// all end points
require("./src/routes/createPayment")(app);
require("./src/routes/find_all_lci_students")(app);

app.listen(port, () => {
  console.log(`server start well at port : ${port}`);
});
