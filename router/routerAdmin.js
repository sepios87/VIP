var express = require("express");
let LoginController = require("./../controllers/LoginController");
let HomeController = require("./../controllers/HomeController");
let VipAdminController = require("./../controllers/VipAdminController")
let PhotoAdminController = require("./../controllers/PhotoAdminController")

var router = express.Router();

router.get("/", LoginController.Index);
router.post("/", LoginController.Identification);

router.get("/home", HomeController.AdminPage);

router.get("/vip/ajouter", VipAdminController.ajouterVip);
router.post("/vip/ajouter", VipAdminController.ajouterVipTraiteInfo);

router.get("/vip/supprimer", VipAdminController.supprimerVip);
router.post("/vip/supprimer", VipAdminController.supprimerVipTraiteInfo);

router.get("/photo/ajouter", PhotoAdminController.ajouterPhotoVip);
router.post("/photo/ajouter", PhotoAdminController.ajouterPhotoVip);

router.get("/photo/supprimer", PhotoAdminController.supprimerPhotoVip);
router.post("/photo/supprimer", PhotoAdminController.supprimerPhotoVipTraitement);

router.get("*", HomeController.NotFound);
router.post("*", HomeController.NotFound);

module.exports = router;
