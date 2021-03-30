let async = require("async");
let modelAlbum = require("../../models/album.js");

module.exports.ListerAlbum = 	function(request, response){
   response.title = 'Album des stars';
   async.parallel(
    [
      function (callback) {
        modelAlbum.getAllImages(function (err, result1) {callback(null, result1)});
      },
      function (callback) {
        if (request.params.idStart !== undefined) //évite de faire requete BD si pas encore de vip choisi
          modelAlbum.getImage(request.params.idStart, function (err, result2) {callback(null, result2)});
        else callback(null, null);
      },
    ],
    function (err, result) {
      if (err) return response.render("error", { error: err });

      response.photos = result[0];
      response.startPhoto = result[1];
      response.id = request.params.idStart;
      if (request.params.idStart !== undefined){
        Number.prototype.mod = function(b) {  
          return ((this % b) + b) % b; 
        } 
        response.start = result[1][0];
        let indexVipActuel = result[0].indexOf(result[0].find(elem => elem.id == result[1][0].id));
        response.indexVipActuel = indexVipActuel;
        response.suivant = result[0][(indexVipActuel+1)%result[0].length].id;
        response.precedent = result[0][(indexVipActuel-1).mod(result[0].length)].id;
      }
      response.render("listerAlbum", response);
    }
  );
};
