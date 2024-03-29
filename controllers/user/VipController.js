let modelVip = require("../../models/vip.js");
let modelProfession = require("../../models/profession.js");
let async = require("async");

module.exports = {
  afficheListeImage: (request, response) => {
    response.title = "Répertoire des stars";

    async.parallel(
      [
        function (callback) {
          modelVip.getFirstLetters(function (err, result) {callback(null, result)});
        },
        function (callback) {
          if (request.params.initiale !== undefined) //évite de faire requete BD si pas encore de lettre choisie
            modelVip.getImage(request.params.initiale, function (err, result) {callback(null, result)});
          else callback(null, null);
        },
      ],
      function (err, result) {
        if (err) return response.render("error", { error: err });
        response.initialesVip = result[0];
        response.image = result[1];
        response.render("repertoireVips", response);
      }
    );
  },

  affichageDescriptionStart: (request, response) => {
    response.title = "Description de la star";

    async.parallel(
      [
        function (callback) {
          modelVip.getFirstLetters(function (err, result) {callback(null, result)});
        },
        function (callback) {
          modelVip.getDetails(request.params.idStart, function (err, result) {callback(null, result[0])});
        },
        function (callback) {
          modelVip.getLiaisons(request.params.idStart, function (err, result) {callback(null, result)});
        },
        function (callback) {
          modelVip.getMariages(request.params.idStart, function (err, result) {callback(null, result)});
        },
        function (callback) {
          modelVip.getAllImages(request.params.idStart, function (err, result) {callback(null, result)});
        },
        function (callback) {
          modelProfession.getDefiles(request.params.idStart, function (err, result) {callback(null, result)});
        },
        function (callback) {
          modelProfession.getFilms(request.params.idStart, function (err, result) {callback(null, result)});
        },
        function (callback) {
          modelProfession.getAlbums(request.params.idStart, function (err, result) {callback(null, result)});
        },
        function (callback) {
          modelProfession.getProfessions(request.params.idStart, function (err, result) {callback(null, result)});
        },
      ],
      function (err, result) {
        if (err) return response.render("error", { error: err });
        response.initialesVip = result[0];
        response.details = result[1];
        response.liaisons = result[2];
        response.mariages = result[3];
        response.images = result[4];
        let tabProfessions = [];
        result[8].forEach(elem => {
          switch (elem.profession){
            case 'mannequin' :  tabProfessions.push({profession : elem.profession, defiles : result[5]});
              break;
            case 'actrice':
            case 'acteur' : tabProfessions.push({profession : elem.profession, films : result[6]});
              break;
            case 'chanteuse':
            case 'chanteur' : tabProfessions.push({profession : elem.profession, albums : result[7]});
              break;
            default : tabProfessions.push({profession : elem.profession});
            break;
          }
        });
        response.tabProfessions = tabProfessions;
        response.render("descriptionStart", response);
      }
    );
  },
};
