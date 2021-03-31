module.exports = {
    NotFound: (request, response) => {
        response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
        response.render('notFound', response);
    },
    AdminPage: (request, response) => {
        response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
        response.render('home', response);
    }
}