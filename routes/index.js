const express = require("express");
const router = express.Router();
const indexController = require('../controllers/index')


router.get("/", indexController.index)
router.post("/shrunkUrls", indexController.createUrl)
router.get("/:shrunkUrl", indexController.accessUrl)
router.delete("/:id", indexController.delete)

module.exports = router;
