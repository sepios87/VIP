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
      getAllImages: (callback) => {
        requete(callback, `SELECT v.VIP_NUMERO as id, PHOTO_ADRESSE as image, PHOTO_COMMENTAIRE as description
                            FROM vip v, photo p 
                            WHERE v.VIP_NUMERO = p.VIP_NUMERO
                            GROUP BY v.VIP_NUMERO
                            ORDER BY 1`);
      },

      getImage: (arg, callback) => {
        requete(callback, `SELECT v.VIP_NUMERO as id, VIP_NOM as nom, VIP_PRENOM as prenom, PHOTO_SUJET as sujet, PHOTO_ADRESSE as image, PHOTO_COMMENTAIRE as description
                            FROM vip v, photo p 
                            WHERE v.VIP_NUMERO = p.VIP_NUMERO AND v.VIP_NUMERO=${arg}`);
      },
}    