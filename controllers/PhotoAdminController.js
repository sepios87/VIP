var formidable = require('formidable');
let modelVipStats = require("../models/vipStats.js");

module.exports = {
    ajouterPhotoVip: (request, response) => {
    if (!request.session.connect) return response.redirect("/");
    response.name = request.session.name;
    response.title = "Répertoire des stars";
    response.connect = request.session.connect; //sinon n'affiche pas le reste de la page
    
    modelVipStats.getAllVip(function (err, result) {
        response.vip = result;
        console.log(result)
        response.render("ajouterPhotoVip", response);
    });

  }
};
