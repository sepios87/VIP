let express         = require('express'),
    session         = require('express-session'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'), //pour récupérer les résultats des post
    http            = require('http'),
    path            = require('path');

let app_admin = express();

app_admin.use(bodyParser.urlencoded({extended: true}));
app_admin.set('port', 6900);
app_admin.set('views', path.join(__dirname, 'views/admin'));

// routes static, le routeur n'y aura pas accès
app_admin.use(express.static(path.join(__dirname, '/public')));

app_admin.use(cookieParser());

app_admin.use(session({
    secret: 'nC0@#1pM/-0qA1+é',
    connect: false,
    resave: true,
    saveUninitialized: true
}));

let exphbs = require('express-handlebars');
app_admin.set('view engine', 'handlebars'); //nom de l'extension des fichiers
let handlebars_admin  = require('./helpers/handlebars.js')(exphbs, 'mainAdmin'); //emplacement des helpers

app_admin.engine('handlebars', handlebars_admin.engine);

var routes_admin = require('./router/routerAdmin');
app_admin.use('/', routes_admin);

app_admin.use(express.static(__dirname +'/public')); //pour executer du js car sinon bloqué

http.createServer(app_admin).listen(app_admin.get('port'), function(){
    console.log('Serveur Node.js en attente sur le port ' + app_admin.get('port'));
});
