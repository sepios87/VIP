let async = require("async");
let modelArticle = require("../models/article.js");

module.exports = {
  affichageArticles: (request, response) => {
    response.title = "Répertoire des stars";

    async.parallel(
      [
        function (callback) {
          modelArticle.getAllVipWithArticle(function (err, result) {
            if (err) return response.render("error", { error: err });
            response.vip = result;
            callback(null, response);
          });
        },
        function (callback) {
          if (request.params.idStart !== undefined) {
            //évite de faire requete BD si pas encore de vip choisi
            modelArticle.getArticle(request.params.idStart, function (err, result) {
              if (err) return response.render("error", { error: err });
              response.article = result[0];
              response.id = request.params.idStart;
              callback(null, response);
            });
          } else callback(null, null);
        },
      ],
      function () {
        response.render("article", response);
      }
    );
  },
};
