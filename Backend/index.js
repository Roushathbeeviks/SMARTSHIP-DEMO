const express = require("express");
var cors = require("cors");
const app = express();

const connection = require("./db/connection");
const userroutes = require("./routes/user.route");

app.listen(8080, () => {
  console.log("server running at port:3000");
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userroutes);
