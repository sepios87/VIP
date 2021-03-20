let modelVipStats = require("../models/vipStats.js");
let modelGestionVip = require("../models/gestionVip.js");
var formidable = require('formidable');

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
        modelGestionVip.addImage({id : result.insertId, image : file.image.name, info : fields});
      })
    });

    form.on('fileBegin', function (name, file){
      file.path = __dirname + '/../public/images/vip/' + file.name;
    });

    response.render("ajouterVip", response);
  },

  supprimerVip: (request, response) => {
    if (!request.session.connect) return response.redirect("/");
    response.title = "Répertoire des stars";
    response.connect = request.session.connect; //sinon n'affiche pas le reste de la page
    response.name = request.session.name;
    
    modelVipStats.getAllVip(function (err, result) {
      response.vip = result;
      console.log(result)
      response.render("supprimerVip", response);
    });
  },

  supprimerVipTraiteInfo: (request, response) => {
    if (!request.session.connect) return response.redirect("/");
    response.title = "Répertoire des stars";
    response.connect = request.session.connect; //sinon n'affiche pas le reste de la page
    response.name = request.session.name;

    response.render("supprimerVip", response);

  }


};
