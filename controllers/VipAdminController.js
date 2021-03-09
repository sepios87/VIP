let modelVipStats = require("../models/vipStats.js");
let modelGestionVip = require("../models/gestionVip.js");
let async = require("async");
var path = require("path");

module.exports = {
  ajouterVip: (request, response) => {
    if (!request.session.connect) return response.redirect("/");
    response.title = "Répertoire des stars";
    response.connect = request.session.connect; //sinon n'affiche pas le reste de la page
    modelVipStats.getAllNationalite(function (err, result) {
        response.nationalite = result;
        response.date = Date.now();
        response.render("ajouterVip", response);
    });
  },

  ajouterVipTraiteInfo: (request, response) => {
    if (!request.session.connect) return response.redirect("/");
    response.title = "Répertoire des stars";
    response.connect = request.session.connect; //sinon n'affiche pas le reste de la page
    console.log(request.body);

    response.render("ajouterVip", response);
  },
};
