require("dotenv").config();

const express = require("express"),
  cors = require("cors"),
  mongoose = require("mongoose");

require("./models/User.model");
require("./models/Question.model");

require("./config/passport");

let app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/v1", require("./routes"));

app.use(function (req, res, next) {
    console.log('Hola')
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

let server = app.listen(process.env.PORT || 3001, function () {
  console.log("Escuchando en el puerto " + server.address().port);
});
