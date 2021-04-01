module.exports = {
    Index: (request, response) => {
        response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
        response.render('home', response);
    },
    NotFound: (request, response) => {
        response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
        response.render('notFound', response);
    }
}