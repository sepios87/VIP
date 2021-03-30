let modelVipStats = require("../../models/vipStats.js");
let modelGestionVip = require("../../models/gestionVip.js");
let modelVip = require("../../models/vip.js");
var formidable = require('formidable');
let async = require("async");

module.exports = {
  ajouterVip: (request, response) => {
    if (!request.session.connect) return response.redirect("/");
    response.title = "Répertoire des stars";
    response.connect = request.session.connect; //sinon n'affiche pas le reste de la page
    response.name = request.session.name;
    
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
    response.name = request.session.name;

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
      file.path = __dirname + '/../public/images/vip/' + file.name;
    });

    response.render("ajouterVip", response);
  },

  selectionnerVip: (request, response) => {
    if (!request.session.connect) return response.redirect("/");
    response.title = "Répertoire des stars";
    response.connect = request.session.connect; //sinon n'affiche pas le reste de la page
    response.name = request.session.name;
    
    modelVipStats.getAllVip(function (err, result) {
      response.vip = result;
      response.render("selectionVip", response);
    });
  },

  modifierVip: (request, response) => {
    if (!request.session.connect) return response.redirect("/");
    response.title = "Répertoire des stars";
    response.connect = request.session.connect; //sinon n'affiche pas le reste de la page
    response.name = request.session.name;

    async.parallel(
      [
        function (callback) {
          modelVip.getDetails(request.params.idStart, function (err, result) {callback(null, result[0])});
        },
        function (callback) {
          modelVipStats.getAllNationalite(function (err, result) {callback(null, result)});
        },
      ], function (err, result) {
        response.vip = result[0];
        response.nationalite = result[1];
        response.render("modifierVip", response);
      });
  },

  modifierVipTraiterInfo: (request, response) => {
    if (!request.session.connect) return response.redirect("/");
    response.title = "Répertoire des stars";
    response.connect = request.session.connect; //sinon n'affiche pas le reste de la page
    response.name = request.session.name;

    console.log(request.body)
    

    modelVipStats.getAllVip(function (err, result) {
      response.vip = result;
      response.render("selectionVip", response);
    });
  },

  supprimerVip: (request, response) => {
    if (!request.session.connect) return response.redirect("/");
    response.title = "Répertoire des stars";
    response.connect = request.session.connect; //sinon n'affiche pas le reste de la page
    response.name = request.session.name;
    
    modelVipStats.getAllVip(function (err, result) {
      response.vip = result;
      response.render("supprimerVip", response);
    });
  },

  supprimerVipTraiteInfo: async (request, response) => {
    if (!request.session.connect) return response.redirect("/");
    response.title = "Répertoire des stars";
    response.connect = request.session.connect; //sinon n'affiche pas le reste de la page
    response.name = request.session.name;
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
        console.log(err)
        modelGestionVip.removeVip((request.body.idVip), function(err, result){
          console.log(err)
          modelVipStats.getAllVip(function (err, result) {
            response.vip = result;
            response.render("supprimerVip", response);
          });
        });
      }
    );
    
  }
};
