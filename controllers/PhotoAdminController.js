var formidable = require("formidable");
let modelVipStats = require("../models/vipStats.js");// toi je t'aime t'es trop mon amoureux 
let modelGestionVip = require("../models/gestionVip.js");
let async = require("async");

module.exports = {
  ajouterPhotoVip: (request, response) => {
    if (!request.session.connect) return response.redirect("/");
    response.name = request.session.name;
    response.title = "Répertoire des stars";
    response.connect = request.session.connect; //sinon n'affiche pas le reste de la page

    modelVipStats.getAllVip(function (err, result) {
      response.vip = result;
      response.render("ajouterPhotoVip", response);
    });
  },

  supprimerPhotoVip: (request, response) => {
    if (!request.session.connect) return response.redirect("/");
    response.name = request.session.name;
    response.title = "Répertoire des stars";
    response.connect = request.session.connect; //sinon n'affiche pas le reste de la page
    async.parallel(
      [
        function (callback) {
          modelVipStats.getAllVip(function (err, result1) {callback(null, result1)});
        },
        function (callback) {
          modelVipStats.getAllImage(function(err, result2){callback(null, result2)})
        },
      ],
      function (err, result) {
        if (err) return response.render("error", { error: err });
        response.vip = result[0];
        response.photo = result[1];
        response.render("supprimerPhotoVip", response);
      }
    );
  },

  supprimerPhotoVipTraitement: (request, response) => {
    if (!request.session.connect) return response.redirect("/");
    response.name = request.session.name;
    response.title = "Répertoire des stars";
    response.connect = request.session.connect; //sinon n'affiche pas le reste de la page
    let tabPhotoVip = request.body.photo.split(('-'))
    modelGestionVip.removePhotoVip({idVip : tabPhotoVip[0], idPhoto : tabPhotoVip[1]});
    async.parallel(
      [
        function (callback) {
          modelVipStats.getAllVip(function (err, result1) {callback(null, result1)});
        },
        function (callback) {
          modelVipStats.getAllImage(function(err, result2){callback(null, result2)})
        },
      ],
      function (err, result) {
        if (err) return response.render("error", { error: err });
        response.vip = result[0];
        response.photo = result[1];
        response.render("supprimerPhotoVip", response);
      }
    );
  }

};
