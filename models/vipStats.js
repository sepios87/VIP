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
  }

};