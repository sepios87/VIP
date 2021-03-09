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

  getImage: (arg, callback) => {
    requete(callback, 
      `SELECT DISTINCT v.VIP_NUMERO as id, VIP_NOM AS nom, VIP_PRENOM AS prenom, PHOTO_ADRESSE AS photo, PHOTO_COMMENTAIRE as alt 
      FROM photo p, vip v 
      WHERE p.VIP_NUMERO = v.VIP_NUMERO AND p.PHOTO_NUMERO = 1 AND v.VIP_NOM LIKE '${arg}%';`);
  },

  getDetails: (arg, callback) => {
    requete(callback, 
    `SELECT VIP_NOM as nom, VIP_PRENOM as prenom, VIP_NAISSANCE as naissance, NATIONALITE_NOM as nationalite, VIP_TEXTE as description 
      FROM vip v, nationalite n 
      WHERE v.VIP_NUMERO=${arg} AND v.NATIONALITE_NUMERO = n.NATIONALITE_NUMERO`);
  },

  getMariages: (arg, callback) => {
    requete(callback, 
      `SELECT VIP_NOM as mariageAvecNom, VIP_PRENOM as mariageAvecPrenom, v.VIP_NUMERO as id, DATE_EVENEMENT as dateDebut, PHOTO_ADRESSE as image, MARIAGE_FIN as dateFin, MARIAGE_LIEU as lieu, v.VIP_TEXTE as descr 
      FROM mariage m, vip v, photo p
      WHERE (v.VIP_NUMERO = m.VIP_VIP_NUMERO OR v.VIP_NUMERO = m.VIP_NUMERO) AND (m.VIP_NUMERO = ${arg} OR m.VIP_VIP_NUMERO = ${arg}) AND v.VIP_NUMERO != ${arg} AND p.VIP_NUMERO=v.VIP_NUMERO
      AND PHOTO_ADRESSE IN (select MIN(PHOTO_ADRESSE) FROM photo p2 WHERE p2.VIP_NUMERO = v.VIP_NUMERO)`);
  },

  getLiaisons: (arg, callback) => {
    requete(callback, 
      `SELECT VIP_NOM as liaisonAvecNom, VIP_PRENOM as liaisonAvecPrenom, v.VIP_NUMERO as id, PHOTO_ADRESSE as image, DATE_EVENEMENT as date, LIAISON_MOTIFFIN as raisonFin, v.VIP_TEXTE as descr
      FROM liaison l, vip v, photo p
      WHERE (v.VIP_NUMERO = l.VIP_VIP_NUMERO OR v.VIP_NUMERO = l.VIP_NUMERO) AND (l.VIP_NUMERO = ${arg} OR l.VIP_VIP_NUMERO = ${arg}) AND v.VIP_NUMERO != ${arg} AND p.VIP_NUMERO=v.VIP_NUMERO
      AND PHOTO_ADRESSE IN (select MIN(PHOTO_ADRESSE) FROM photo p2 WHERE p2.VIP_NUMERO = v.VIP_NUMERO)`);
  },

  getAllImages: (arg, callback) => {
    requete(callback, 
    `SELECT PHOTO_ADRESSE AS photo, PHOTO_COMMENTAIRE as alt, PHOTO_SUJET as sujet 
    FROM photo p, vip v 
    WHERE p.VIP_NUMERO = v.VIP_NUMERO AND v.VIP_NUMERO = ${arg}`);
  }

};