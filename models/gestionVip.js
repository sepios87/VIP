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
    console.log(arg)
    requete(callback, 
      `INSERT INTO vip (VIP_NOM, VIP_PRENOM, NATIONALITE_NUMERO, VIP_SEXE, VIP_NAISSANCE, VIP_TEXTE, VIP_DATE_INSERTION)
        VALUES('${arg.info.nom}', '${arg.info.prenom}', ${arg.info.nationalite}, '${arg.info.sexe}', '${arg.info.dateNaissance}', '${arg.info.commentaire}', '${arg.date}')`);
  },

};