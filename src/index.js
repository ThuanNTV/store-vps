"use strict";

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
var methodOverride = require("method-override");
const app = express();

require("dotenv").config();

const port = process.env.PORT;

const route = require("./routes");
const db = require("./config/db");
// const SortMiddleware = require("./app/middleware/SortMiddleware");

// format date

// connect db
db.connect();

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
// app.use(SortMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// XMLHttpRequest, fetch

// HTTP logger
// app.use(morgan("combined"));

// Template engine

app.engine(
  "hbs",
  handlebars.engine({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

route(app);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
