module.exports = (request, response, next) => {
  if (!request.session.connect) {
    response.redirect("/");
    response.end();
  } else {
    response.name = request.session.name;
    response.title = "Répertoire des stars";
    response.connect = request.session.connect;
    next();
  }
};
