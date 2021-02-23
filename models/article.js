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
    getArticle: (arg, callback) => {
        requete(callback, `SELECT ARTICLE_RESUME as resume, ARTICLE_DATE_INSERT as date, VIP_NOM as nomVip, VIP_PRENOM as prenomVip
                          FROM vip v, apoursujet s, article a 
                          WHERE s.VIP_NUMERO = ${arg} AND s.VIP_NUMERO = v.VIP_NUMERO AND a.ARTICLE_NUMERO=s.ARTICLE_NUMERO`);
      },

      getAllVipWithArticle: (callback) => {
        requete(callback, "SELECT DISTINCT s.VIP_NUMERO as id, VIP_NOM as nom, VIP_PRENOM as prenom FROM vip v, apoursujet s WHERE s.VIP_NUMERO = v.VIP_NUMERO;");
      },
}    