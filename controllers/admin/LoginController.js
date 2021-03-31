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
        //console.log(cryptr.decrypt('7c8410cbdcf4b6d4e500a27e1fd19061a0ba241fdb140fe0e72db33ea2d87f4a20b9'));
        //let encryptedString = cryptr.encrypt(request.body.mdp);
        //console.log(cryptr.decrypt('a1f4702f45e0a3e7605e32a5ce062a61d306644d516165551bbecc58103e1cc503c6'))
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