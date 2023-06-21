const express = require("express");
const router = express.Router();

const siteController = require("../app/controller/MainController");

router.get("/search", siteController.search);

// [end]
router.get("/", siteController.index);

module.exports = router;
