let modelVipStats = require("../models/vipStats.js");
let modelGestionVip = require("../models/gestionVip.js");
var formidable = require('formidable');

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

    var form = new formidable.IncomingForm();
    let champs;

    form.parse(request, (err, fields, files) => {
      console.log(fields)
    });

    form.on('fileBegin', function (name, file){
      file.path = __dirname + '/../public/images/' + file.name;
    });

    form.on('file', function (name, file){
      console.log('Uploaded ' + file.name);
    });

    let d = new Date,
    dformat = [d.getFullYear(),(d.getMonth()+1).toString().padStart(2, '0'), d.getDate().toString().padStart(2, '0')].join('-')
      +' '
      +[d.getHours(),d.getMinutes().toString().padStart(2, '0').toString().padStart(2, '0'),d.getSeconds().toString().padStart(2, '0')].join(':');
    
    // modelGestionVip.addVip({info : request.body, date : dformat}, function(err, result){
    //   console.log(err, result)
    //   response.render("ajouterVip", response);
    // })
    response.render("ajouterVip", response);

  },
};
