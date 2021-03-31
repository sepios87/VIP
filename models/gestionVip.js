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

  addVip: (vip, callback) => {
    requete(callback, 
      `INSERT INTO vip (VIP_NOM, VIP_PRENOM, NATIONALITE_NUMERO, VIP_SEXE, VIP_NAISSANCE, VIP_TEXTE, VIP_DATE_INSERTION)
        VALUES('${vip.info.nom}', '${vip.info.prenom}', ${vip.info.nationalite}, '${vip.info.sexe}', '${vip.info.dateNaissance}', '${vip.info.commentaire}', '${vip.date}')`);
  },

  addImage: (photo, callback) => {
    requete(callback, 
      `INSERT INTO photo (PHOTO_NUMERO, VIP_NUMERO, PHOTO_SUJET, PHOTO_COMMENTAIRE, PHOTO_ADRESSE) 
      VALUES(${photo.num}, ${photo.id}, '${photo.info.sujet}', '${photo.info.descr}', '${photo.image}')`);
  },

  removeVip : (idVip, callback) => {
    requete(callback,`DELETE FROM vip where VIP_NUMERO=${idVip}`);
  },

  removePhoto : (idVip, callback) => {
    requete(callback,`DELETE FROM photo where VIP_NUMERO=${idVip}`);
  },

  removeJoue: (idVip, callback) => {
    requete(callback,`DELETE FROM joue where VIP_NUMERO=${idVip}`);
  },

  removeActeur: (idVip, callback) => {
    requete(callback,`DELETE FROM acteur where VIP_NUMERO=${idVip}`);
  },

  removeCompose: (idVip, callback) => {
    requete(callback,`DELETE FROM composer where VIP_NUMERO=${idVip}`);
  },

  removeChanteur: (idVip, callback) => {
    requete(callback,`DELETE FROM chanteur where VIP_NUMERO=${idVip}`);
  },

  removeDefile: (idVip, callback) => {
    requete(callback,`DELETE FROM defile where VIP_NUMERO=${idVip}`);
  },

  removeCouturier: (idVip, callback) => {
    requete(callback,`DELETE FROM couturier where VIP_NUMERO=${idVip}`);
  },

  removeDefileDans: (idVip, callback) => {
    requete(callback,`DELETE FROM defiledans where VIP_NUMERO=${idVip}`);
  },

  removeAPourAgence: (idVip, callback) => {
    requete(callback,`DELETE FROM apouragence where VIP_NUMERO=${idVip}`);
  },

  removeMannequin: (idVip, callback) => {
    requete(callback,`DELETE FROM mannequin where VIP_NUMERO=${idVip}`);
  },
  
  removeFilm: (idVip, callback) => {
    requete(callback,`DELETE FROM film where VIP_NUMERO=${idVip}`);
  },

  removeRealisateur: (idVip, callback) => {
    requete(callback,`DELETE FROM realisateur where VIP_NUMERO=${idVip}`);
  },

  removeMariage: (idVip, callback) => {
    requete(callback,`DELETE FROM mariage where VIP_NUMERO=${idVip} OR VIP_VIP_NUMERO =${idVip}`);
  },

  removeLiaison: (idVip, callback) => {
    requete(callback,`DELETE FROM liaison where VIP_NUMERO=${idVip} OR VIP_VIP_NUMERO =${idVip}`);
  },

  removeAPourSujet: (idVip, callback) => {
    requete(callback,`DELETE FROM apoursujet where VIP_NUMERO=${idVip}`);
  },

  removePhotoVip : (arg, callback) => {
    requete(callback,`DELETE FROM photo where VIP_NUMERO=${arg.idVip} AND PHOTO_NUMERO=${arg.idPhoto}`);
  },

  modifierVip: (arg, callback) => {
    requete(callback,`UPDATE vip SET VIP_PRENOM='${arg.vip.prenom}', VIP_NOM='${arg.vip.nom}', VIP_SEXE='${arg.vip.sexe}', VIP_NAISSANCE='${arg.vip.dateNaissance}', VIP_TEXTE='${arg.vip.commentaire}' WHERE VIP_NUMERO=${arg.id}`);
  },

};