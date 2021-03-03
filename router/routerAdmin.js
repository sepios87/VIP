var express = require("express");
let LoginController = require("./../controllers/LoginController");
let HomeController = require("./../controllers/HomeController");
let VipAdminController = require("./../controllers/VipAdminController")

var router = express.Router();

router.get("/", LoginController.Index);
router.post("/", LoginController.Identification);

router.get("/home", HomeController.AdminPage);

router.get("/vip/ajouter", VipAdminController.choixMenuVip);

router.get("*", HomeController.NotFound);
router.post("*", HomeController.NotFound);

module.exports = router;
