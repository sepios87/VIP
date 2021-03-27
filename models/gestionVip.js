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
      VALUES(1, ${arg.id}, '${arg.info.sujet}', '${arg.info.descr}', '${arg.image}')`);
  },

  removeVip : (arg, callback) => {
    requete(callback,`DELETE FROM vip where VIP_NUMERO=${arg}`);
  },

  removePhoto : (arg, callback) => {
    requete(callback,`DELETE FROM photo where VIP_NUMERO=${arg}`);
  },

  removePhotoVip : (arg, callback) => {
    requete(callback,`DELETE FROM photo where VIP_NUMERO=${arg.idVip} AND PHOTO_NUMERO=${arg.idPhoto}`);
  }

};