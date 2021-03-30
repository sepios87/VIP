let db = require("../configDb");

const requete = (callback, requete) => {
  return db.getConnection(function (err, connexion) {
    if (!err) {
      connexion.query(requete, callback);
      connexion.release();
    } else console.log(err);
  });
}

module.exports = {

  addVip: (arg, callback) => {
    requete(callback, 
      `INSERT INTO vip (VIP_NOM, VIP_PRENOM, NATIONALITE_NUMERO, VIP_SEXE, VIP_NAISSANCE, VIP_TEXTE, VIP_DATE_INSERTION)
        VALUES('${arg.info.nom}', '${arg.info.prenom}', ${arg.info.nationalite}, '${arg.info.sexe}', '${arg.info.dateNaissance}', '${arg.info.commentaire}', '${arg.date}')`);
  },

  addImage: (arg, callback) => {
    requete(callback, 
      `INSERT INTO photo (PHOTO_NUMERO, VIP_NUMERO, PHOTO_SUJET, PHOTO_COMMENTAIRE, PHOTO_ADRESSE) 
      VALUES(${arg.num}, ${arg.id}, '${arg.info.sujet}', '${arg.info.descr}', '${arg.image}')`);
  },

  removeVip : (arg, callback) => {
    requete(callback,`DELETE FROM vip where VIP_NUMERO=${arg}`);
  },

  removePhoto : (arg, callback) => {
    requete(callback,`DELETE FROM photo where VIP_NUMERO=${arg}`);
  },

  removeJoue: (arg, callback) => {
    requete(callback,`DELETE FROM joue where VIP_NUMERO=${arg}`);
  },

  removeActeur: (arg, callback) => {
    requete(callback,`DELETE FROM acteur where VIP_NUMERO=${arg}`);
  },

  removeCompose: (arg, callback) => {
    requete(callback,`DELETE FROM composer where VIP_NUMERO=${arg}`);
  },

  removeChanteur: (arg, callback) => {
    requete(callback,`DELETE FROM chanteur where VIP_NUMERO=${arg}`);
  },

  removeDefile: (arg, callback) => {
    requete(callback,`DELETE FROM defile where VIP_NUMERO=${arg}`);
  },

  removeCouturier: (arg, callback) => {
    requete(callback,`DELETE FROM couturier where VIP_NUMERO=${arg}`);
  },

  removeDefileDans: (arg, callback) => {
    requete(callback,`DELETE FROM defiledans where VIP_NUMERO=${arg}`);
  },

  removeAPourAgence: (arg, callback) => {
    requete(callback,`DELETE FROM apouragence where VIP_NUMERO=${arg}`);
  },

  removeMannequin: (arg, callback) => {
    requete(callback,`DELETE FROM mannequin where VIP_NUMERO=${arg}`);
  },
  
  removeFilm: (arg, callback) => {
    requete(callback,`DELETE FROM film where VIP_NUMERO=${arg}`);
  },

  removeRealisateur: (arg, callback) => {
    requete(callback,`DELETE FROM realisateur where VIP_NUMERO=${arg}`);
  },

  removeMariage: (arg, callback) => {
    requete(callback,`DELETE FROM mariage where VIP_NUMERO=${arg} OR VIP_VIP_NUMERO =${arg}`);
  },

  removeLiaison: (arg, callback) => {
    requete(callback,`DELETE FROM liaison where VIP_NUMERO=${arg} OR VIP_VIP_NUMERO =${arg}`);
  },

  removeAPourSujet: (arg, callback) => {
    requete(callback,`DELETE FROM apoursujet where VIP_NUMERO=${arg}`);
  },

  removePhotoVip : (arg, callback) => {
    requete(callback,`DELETE FROM photo where VIP_NUMERO=${arg.idVip} AND PHOTO_NUMERO=${arg.idPhoto}`);
  }

};