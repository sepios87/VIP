var express = require("express");
let HomeController = require("./../controllers/HomeController");
let VipController = require("./../controllers/VipController");
let AlbumController = require("./../controllers/AlbumController");
let ArticleController = require("./../controllers/ArticleController");

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
