var express = require("express");
let LoginController = require("./../controllers/LoginController");
let HomeController = require("./../controllers/HomeController");

var router = express.Router();

// Main Routes
router.get("/", LoginController.Index);
router.get("/accueil", HomeController.Index);

// tout le reste
router.get("*", HomeController.NotFound);
router.post("*", HomeController.NotFound);

module.exports = router;
