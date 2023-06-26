const express = require("express");
const router = express.Router();

const homeController = require("../app/controller/HomeController");

router.get("/mua-vps", homeController.index);
// [end]
router.get("/", homeController.index);

module.exports = router;
