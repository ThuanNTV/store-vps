"use strict";
const VPSRouter = require("./VPS");
const siteRouter = require("./main");
const homeRouter = require("./home");
// const coursesRouter = require("./courses");

function routes(app) {
  app.use("/vps", VPSRouter);
  app.use("/client", homeRouter);

  // start
  app.use("/", siteRouter);
}

module.exports = routes;
