let db = require("../configDb");

const requete = (callback, requete) => {
  return db.getConnection(function (err, connexion) {
    if (!err) {
      connexion.query(requete, callback);
      connexion.release();
    }
  });
}

module.exports = {
    
    getProfessions: (arg, callback) => {
        requete(callback, 
        `SELECT case WHEN VIP_SEXE='F' THEN 'chanteuse' ELSE 'chanteur' END as profession FROM chanteur c, vip v WHERE c.VIP_NUMERO=${arg} AND v.VIP_NUMERO=c.VIP_NUMERO
        UNION
        SELECT 'mannequin' as profession FROM mannequin WHERE VIP_NUMERO=${arg}
        UNION
        SELECT case WHEN VIP_SEXE='F' THEN 'actrice' ELSE 'acteur' END as profession FROM acteur a, vip v WHERE a.VIP_NUMERO=${arg} AND v.VIP_NUMERO=a.VIP_NUMERO
        UNION
        SELECT case WHEN VIP_SEXE='F' THEN 'couturiere' ELSE 'couturier' END as profession FROM couturier c, vip v WHERE c.VIP_NUMERO=${arg} AND v.VIP_NUMERO=c.VIP_NUMERO
        UNION
        SELECT case WHEN VIP_SEXE='F' THEN 'realisatrice' ELSE 'realisateur' END as profession FROM realisateur r, vip v WHERE r.VIP_NUMERO=${arg} AND v.VIP_NUMERO=r.VIP_NUMERO`);
      },

      getDefiles: (arg, callback) => {
        requete(callback, 
        `SELECT DEFILE_LIEU as lieu, v.VIP_NUMERO as id, DEFILE_DATE as date, v.VIP_NOM as nomCouturier, v.VIP_PRENOM as prenomCouturier, PHOTO_ADRESSE as image, v.VIP_TEXTE as descr
        FROM defile d, defiledans dd, vip v, photo p
        WHERE dd.VIP_NUMERO = ${arg} AND dd.DEFILE_NUMERO = d.DEFILE_NUMERO AND v.VIP_NUMERO = d.VIP_NUMERO AND p.VIP_NUMERO=v.VIP_NUMERO
        AND PHOTO_ADRESSE IN (select MIN(PHOTO_ADRESSE) FROM photo p2 WHERE p2.VIP_NUMERO = v.VIP_NUMERO)`);
      },
    
      getFilms: (arg, callback) => {
        requete(callback, 
        `SELECT FILM_TITRE as titre, v.VIP_NUMERO as id, FILM_DATEREALISATION as date, VIP_NOM as nomRealisateur, VIP_PRENOM as prenomRealisateur, PHOTO_ADRESSE as image, v.VIP_TEXTE as descr
        FROM joue j, film f, vip v, photo p
        WHERE j.VIP_NUMERO = ${arg} AND j.FILM_NUMERO = f.FILM_NUMERO AND v.VIP_NUMERO = f.VIP_NUMERO AND p.VIP_NUMERO=v.VIP_NUMERO 
        AND PHOTO_ADRESSE IN (select MIN(PHOTO_ADRESSE) FROM photo p2 WHERE p2.VIP_NUMERO = v.VIP_NUMERO)`);
      },
    
      getAlbums: (arg, callback) => {
        requete(callback, 
        `SELECT ALBUM_TITRE as album, MAISONDISQUE_NOM as maisonDisque, ALBUM_DATE as date
        FROM album a, maisondisque m, composer c  
        WHERE c.VIP_NUMERO = ${arg} AND c.ALBUM_NUMERO = a.ALBUM_NUMERO AND a.MAISONDISQUE_NUMERO = m.MAISONDISQUE_NUMERO`);
      },
}