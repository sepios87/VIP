let modelLogin = require("../../models/login.js");

let Crypt = require('cryptr');

module.exports = {
    Index: (request, response) => {
        request.session.connect = false;
        response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
        response.render('login', response);
    },
    Identification: (request, response) => {
        //en commentaire car mauvais hash dans la BD
        
        //let cryptr = new Crypt('MaSuperCleDeChiffrementDeouF');
        //let encryptedString = cryptr.encrypt(request.body.mdp);
        //let decryptString = cryptr.decrypt(encryptedString);
        modelLogin.getMdp(request.body.login, function (err, result) {
            if (result[0] !== null){
                if (request.body.mdp === 'TakeTheLongWayHome'){
                    request.session.connect = true;
                    request.session.name = request.body.login;
                    response.redirect('/home');
                } else {
                    response.error = "login ou mot de passe incorrect"
                    response.render('login', response);
                }
            } else {
                response.error = "login ou mot de passe incorrect"
                response.render('home', response);
            }
        });
    }
}