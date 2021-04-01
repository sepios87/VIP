let modelGestionVip = require("../../models/gestionVip.js");
let modelVip = require("../../models/vip.js");
var formidable = require('formidable');
let async = require("async");

module.exports = {
  ajouterVip: (request, response) => {   
    response.title = "Ajout d'une star";
    modelVip.getAllNationalite(function (err, result) {
        response.nationalite = result;
        response.date = Date.now();
        response.render("ajouterVip", response);
    });
  },

  ajouterVipTraiteInfo: (request, response) => {
    var form = new formidable.IncomingForm();

    let d = new Date,
    dformat = [d.getFullYear(),(d.getMonth()+1).toString().padStart(2, '0'), d.getDate().toString().padStart(2, '0')].join('-')+' '
      +[d.getHours(),d.getMinutes().toString().padStart(2, '0').toString().padStart(2, '0'),d.getSeconds().toString().padStart(2, '0')].join(':');

    form.parse(request, (err, fields, file) => {
      modelGestionVip.addVip({info : fields, date : dformat}, function(err, result){
        modelGestionVip.addImage({num : 1, id : result.insertId, image : file.image.name, info : fields});
      });
    });

    form.on('fileBegin', function (name, file){
      file.path = __dirname + '../../../public/images/vip/' + file.name;
    });

    response.redirect("/vip/ajouter");
  },

  selectionnerVip: (request, response) => {
    response.title = "Selection d'une star";
    modelVip.getAllVip(function (err, result) {
      if (err) return response.render("error", { error: err });
      response.vip = result;
      response.render("selectionVip", response);
    });
  },

  modifierVip: (request, response) => {
    response.title = "Modification d'une star";
    modelVip.getDetails(request.params.idStart, function (err, result) {
      if (err) return response.render("error", { error: err });
      response.vip = result[0];
      response.render("modifierVip", response);
    });
  },

  modifierVipTraiterInfo: (request, response) => {
    modelGestionVip.modifierVip({vip : request.body, id : request.params.idStart}, function(err, result){
      if (err) return response.render("error", { error: err });
      response.redirect("/vip/modifier");
    })
  },

  supprimerVip: (request, response) => {
    response.title = "Suppression d'une star";
    modelVip.getAllVip(function (err, result) {
      if (err) return response.render("error", { error: err });
      response.vip = result;
      response.render("supprimerVip", response);
    });
  },

  supprimerVipTraiteInfo: async (request, response) => {
    async.parallel(
      [
        function (callback) {
          modelGestionVip.removePhoto(request.body.idVip, function(err, result) {callback(null, result)});
        },
        function (callback) {
          modelGestionVip.removeDefile(request.body.idVip, function(err, result) {
            modelGestionVip.removeCouturier(request.body.idVip, function(err, result) {callback(null, result)});
          });
        },
        function (callback) {
          modelGestionVip.removeCompose(request.body.idVip, function(err, result) {
            modelGestionVip.removeChanteur(request.body.idVip, function(err, result) {callback(null, result)});
          });
        },
        function (callback) {
          modelGestionVip.removeAPourAgence(request.body.idVip, function(err, result) {
            modelGestionVip.removeDefileDans(request.body.idVip, function(err, result) {
              modelGestionVip.removeMannequin(request.body.idVip, function(err, result) {callback(null, result)});
            })
          });
        },
        function (callback) {
          modelGestionVip.removeJoue(request.body.idVip, function(err, result) {
            modelGestionVip.removeFilm(request.body.idVip, function(err, result) {
              modelGestionVip.removeRealisateur(request.body.idVip, function(err, result) {
                modelGestionVip.removeActeur(request.body.idVip, function(err, result) {callback(null, result)})
              });
            });
          });
        },
        function (callback) {
          modelGestionVip.removeMariage(request.body.idVip, function(err, result) {callback(null, result)});
        },
        function (callback) {
          modelGestionVip.removeAPourSujet(request.body.idVip, function(err, result) {callback(null, result)});
        },
        function (callback) {
          modelGestionVip.removeLiaison(request.body.idVip, function(err, result) {callback(null, result)});
        },
      ],
      function (err, result) {
        if (err) return response.render("error", { error: err });
        modelGestionVip.removeVip((request.body.idVip), function(err, result){
          if (err) return response.render("error", { error: err });
          response.redirect("/vip/supprimer");
        });
      }
    );
    
  }
};
