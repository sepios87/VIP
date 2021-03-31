var formidable = require("formidable");
let modelVip = require("../../models/vip.js");
let modelGestionVip = require("../../models/gestionVip.js");
let async = require("async");

module.exports = {
  ajouterPhotoVip: (request, response) => {
    modelVip.getAllVip(function (err, result) {
      response.vip = result;
      response.render("ajouterPhotoVip", response);
    });
  },

  ajouterPhotoVipTraitement: (request, response) => {
    var form = new formidable.IncomingForm();

    form.parse(request, (err, fields, file) => {
      modelVip.getNumberImage(fields.idVip, function(err, result){
      modelGestionVip.addImage({num : result[0].nb+1, id : fields.idVip, image : file.image.name, info : {sujet : fields.titre, descr : fields.commentaire}});
      });
    });

    form.on('fileBegin', function (name, file){
      file.path = __dirname + '../../../public/images/vip/' + file.name;
    });

    response.redirect("/photo/ajouter");
  },

  supprimerPhotoVip: (request, response) => {
    async.parallel(
      [
        function (callback) {
          modelVip.getAllVip(function (err, result1) {callback(null, result1)});
        },
        function (callback) {
          modelVip.getAllImage(function(err, result2){callback(null, result2)})
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
    let tabPhotoVip = request.body.photo.split(('-'))
    modelGestionVip.removePhotoVip({idVip : tabPhotoVip[0], idPhoto : tabPhotoVip[1]});
    response.redirect("/photo/supprimer");
  }

};
