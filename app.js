let express         = require('express'),
    session         = require('express-session'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'), //pour récupérer les résultats des post
    http            = require('http'),
    path            = require('path');

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('port', 6800);
app.set('views', path.join(__dirname, 'views/user'));

// routes static, le routeur n'y aura pas accès
app.use(express.static(path.join(__dirname, '/public')));

app.use(cookieParser());

app.use(session({
    secret: 'nC0@#1pM/-0qA1+é',
    name: 'VipNode',
    resave: true,
    saveUninitialized: true
}));

/* ces lignes permettent d'utiliser directement les variables de session dans handlebars
 UTILISATION : {{session.MaVariable}}  */
app.use(function(request, response, next){
    response.locals.session = request.session;
    next();
});

let exphbs = require('express-handlebars');
app.set('view engine', 'handlebars'); //nom de l'extension des fichiers
let handlebars  = require('./helpers/handlebars.js')(exphbs, 'main'); //emplacement des helpers

app.engine('handlebars', handlebars.engine);

var routes = require('./router/router');
app.use('/', routes);

app.use(express.static(__dirname +'/public')); //pour executer du js car sinon bloqué

http.createServer(app).listen(app.get('port'), function(){
    console.log('Serveur Node.js en attente sur le port ' + app.get('port'));
});