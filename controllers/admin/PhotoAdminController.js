var formidable = require("formidable");
let modelVipStats = require("../../models/vipStats.js");
let modelGestionVip = require("../../models/gestionVip.js");
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

  ajouterPhotoVipTraitement: (request, response) => {
    if (!request.session.connect) return response.redirect("/");
    response.name = request.session.name;
    response.title = "Répertoire des stars";
    response.connect = request.session.connect; //sinon n'affiche pas le reste de la page

    var form = new formidable.IncomingForm();

    form.parse(request, (err, fields, file) => {
     modelVipStats.getNumberImage(fields.idVip, function(err, result){
      modelGestionVip.addImage({num : result[0].nb+1, id : fields.idVip, image : file.image.name, info : {sujet : fields.titre, descr : fields.commentaire}});
      });
    });

    form.on('fileBegin', function (name, file){
      file.path = __dirname + '../../../public/images/vip/' + file.name;
    });

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
