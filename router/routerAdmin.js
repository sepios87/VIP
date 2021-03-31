var express = require("express");
let HomeController = require("../controllers/admin/HomeAdminController");
let LoginController = require("./../controllers/admin/LoginController");
let VipController = require("./../controllers/admin/VipAdminController")
let PhotoController = require("./../controllers/admin/PhotoAdminController")

var router = express.Router();

const auth = require('../middleware/auth');

router.get("/", LoginController.Index);
router.post("/", LoginController.Identification);

router.get("/home", auth, HomeController.AdminPage);

router.get("/vip/ajouter", auth, VipController.ajouterVip);
router.post("/vip/ajouter", auth, VipController.ajouterVipTraiteInfo);

router.get("/vip/modifier", auth, VipController.selectionnerVip);
router.get("/vip/modifierVip/:idStart", auth, VipController.modifierVip);
router.post("/vip/modifierVip/:idStart", auth, VipController.modifierVipTraiterInfo);

router.get("/vip/supprimer", auth, VipController.supprimerVip);
router.post("/vip/supprimer", auth, VipController.supprimerVipTraiteInfo);

router.get("/photo/ajouter", auth, PhotoController.ajouterPhotoVip);
router.post("/photo/ajouter", auth, PhotoController.ajouterPhotoVipTraitement);

router.get("/photo/supprimer", auth, PhotoController.supprimerPhotoVip);
router.post("/photo/supprimer", auth, PhotoController.supprimerPhotoVipTraitement);

router.get("*", HomeController.NotFound);
router.post("*", HomeController.NotFound);

module.exports = router;
