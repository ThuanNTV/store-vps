const express = require("express");
const router = express.Router();

const VPSController = require("../app/controller/VPSController");

router.get("/create", VPSController.create);
router.post("/lib", VPSController.lib);
router.get("/:id/edit", VPSController.edit);
router.post("/handle-form-actions", VPSController.handleFormActions);
router.put("/:id", VPSController.update);
router.patch("/:id/restore", VPSController.restore);
router.delete("/:id", VPSController.delete);
router.delete("/:id/force", VPSController.forceDelete);
router.get("/:slug", VPSController.show);

module.exports = router;
