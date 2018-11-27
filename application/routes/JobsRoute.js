const express = require("express");
const router = express.Router();

const JobsController = require("../controllers/JobsController");

router.get("/", JobsController.get);

module.exports = router;
