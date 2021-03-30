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
  
  getFirstLetters: (callback) => {
    requete(callback, "SELECT DISTINCT SUBSTRING(VIP_NOM, 1, 1) AS INITIALES FROM vip ORDER BY 1;");
  },

  getAllNationalite: (callback) => {
      requete(callback, "SELECT NATIONALITE_NUMERO AS id, NATIONALITE_NOM as nom FROM nationalite")
  },

  getAllVip: (callback) => {
    requete(callback, "SELECT VIP_NUMERO AS id, VIP_NOM as nom, VIP_PRENOM as prenom FROM vip")
  },

  getAllImage: (callback) => {
    requete(callback, "SELECT PHOTO_NUMERO as id, VIP_NUMERO as vip_id, PHOTO_COMMENTAIRE as commentaire, PHOTO_ADRESSE as adresse FROM photo")
  },

  getNumberImage: (arg, callback) => {
    requete(callback, `SELECT COUNT(*) as nb FROM photo WHERE VIP_NUMERO=${arg}`)
  }

};