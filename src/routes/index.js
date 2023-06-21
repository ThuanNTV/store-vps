"use strict";
// const newsRouter = require("./news");
const VPSRouter = require("./VPS");
const siteRouter = require("./main");
// const coursesRouter = require("./courses");

function routes(app) {
  app.use("/vps", VPSRouter);

  // start
  app.use("/", siteRouter);
}

module.exports = routes;
