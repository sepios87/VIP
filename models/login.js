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
    getMdp: (arg, callback) => {
        requete(callback, `SELECT PASSWD as mdp FROM parametres WHERE LOGIN='${arg}'`);
      },
}