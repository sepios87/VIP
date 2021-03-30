var express = require("express");
let HomeController = require("./../controllers/HomeController");
let VipController = require("./../controllers/user/VipController");
let AlbumController = require("./../controllers/user/AlbumController");
let ArticleController = require("./../controllers/user/ArticleController");

var router = express.Router();

// Main Routes
router.get("/", HomeController.Index);
router.get("/accueil", HomeController.Index);

// VIP
router.get("/repertoire/:initiale?", VipController.afficheListeImage);
router.get("/repertoire/star/:idStart", VipController.affichageDescriptionStart);

// albums
router.get("/album/:idStart?", AlbumController.ListerAlbum);

// articles
router.get("/articles/:idStart?", ArticleController.affichageArticles);

// tout le reste
router.get("*", HomeController.NotFound);
router.post("*", HomeController.NotFound);

module.exports = router;
