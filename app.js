// ┬─┬ノ( º _ ºノ)
// (╯°□°)╯︵ ┻━┻
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
require("./models/connection");

var indexRouter = require("./routes/index");
var tripsRouter = require("./routes/trips");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/trips", tripsRouter);

module.exports = app;
