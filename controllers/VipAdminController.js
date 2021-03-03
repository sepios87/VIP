let modelVip = require("../models/vip.js");
let modelProfession = require("../models/profession.js");
let async = require("async");

module.exports = {
  choixMenuVip: (request, response) => {
    if (!request.session.connect) return response.redirect('/');
    response.title = "Répertoire des stars";
    response.connect = request.session.connect; //sinon n'affiche pas le reste de la page
    response.render("ajouterVip", response);
  }
};
