let async = require("async");
let modelArticle = require("../models/article.js");

module.exports = {
  affichageArticles: (request, response) => {
    response.title = "Répertoire des stars";

    async.parallel(
      [
        function (callback) {
          modelArticle.getAllVipWithArticle(function (err, result1) {callback(null, result1)});
        },
        function (callback) {
          if (request.params.idStart !== undefined) //évite de faire requete BD si pas encore de vip choisi
            modelArticle.getArticle(request.params.idStart, function (err, result2) {callback(null, result2[0])});
          else callback(null, null);
        },
      ],
      function (err, result) {
        if (err) return response.render("error", { error: err });
        response.vip = result[0];
        response.article = result[1];
        response.id = request.params.idStart;
        response.render("article", response);
      }
    );
  },
};
