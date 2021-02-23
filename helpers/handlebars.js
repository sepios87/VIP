let moment = require('moment');

function hbsHelpers(handlebars) {
    return handlebars.create({
        defaultLayout: 'main',

        partialsDir: ['views/partials/'],

        helpers: {
            /* Exemple d'utilisation :
            {{#ifCond  this.vil_num '<' 10}}
               plus petit
             {{else}}
               plus grand
            {{/ifCond}} */
            ifCond : function (v1, operator, v2, options) {

                switch (operator) {
                    case '==':
                        return (v1 == v2) ? options.fn(this) : options.inverse(this);
                    case '===':
                        return (v1 === v2) ? options.fn(this) : options.inverse(this);
                    case '<':
                        return (v1 < v2) ? options.fn(this) : options.inverse(this);
                    case '<=':
                        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                    case '>':
                        return (v1 > v2) ? options.fn(this) : options.inverse(this);
                    case '>=':
                        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                    case '&&':
                        return (v1 && v2) ? options.fn(this) : options.inverse(this);
                    case '||':
                        return (v1 || v2) ? options.fn(this) : options.inverse(this);
                    default:
                        return options.inverse(this);
                }
            },
        }
    });
}

module.exports = hbsHelpers;
