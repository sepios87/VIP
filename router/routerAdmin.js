var express = require("express");
let HomeController = require("./../controllers/HomeController");
let LoginController = require("./../controllers/admin/LoginController");
let VipAdminController = require("./../controllers/admin/VipAdminController")
let PhotoAdminController = require("./../controllers/admin/PhotoAdminController")

var router = express.Router();

router.get("/", LoginController.Index);
router.post("/", LoginController.Identification);

router.get("/home", HomeController.AdminPage);

router.get("/vip/ajouter", VipAdminController.ajouterVip);
router.post("/vip/ajouter", VipAdminController.ajouterVipTraiteInfo);

router.get("/vip/modifier", VipAdminController.selectionnerVip);
router.get("/vip/modifierVip/:idStart", VipAdminController.modifierVip);
router.post("/vip/modifierVip/:idStart", VipAdminController.modifierVipTraiterInfo);

router.get("/vip/supprimer", VipAdminController.supprimerVip);
router.post("/vip/supprimer", VipAdminController.supprimerVipTraiteInfo);

router.get("/photo/ajouter", PhotoAdminController.ajouterPhotoVip);
router.post("/photo/ajouter", PhotoAdminController.ajouterPhotoVipTraitement);

router.get("/photo/supprimer", PhotoAdminController.supprimerPhotoVip);
router.post("/photo/supprimer", PhotoAdminController.supprimerPhotoVipTraitement);

router.get("*", HomeController.NotFound);
router.post("*", HomeController.NotFound);

module.exports = router;
