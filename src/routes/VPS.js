const express = require("express");
const router = express.Router();

const VPSController = require("../app/controller/VPSController");

router.get("/stored/courses", VPSController.storedCourse);
router.get("/trash/courses", VPSController.trashCourse);

module.exports = router;
