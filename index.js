var util = require('util');
var express = require('express');
var builder = require('component-middleware');
var cors = require('cors');

var app = express();

app.use(express.static('public'));

app.use(cors());

var domains = ['accounts', 'advertising', 'autos'];

domains.forEach(function (domain) {
    app.use(util.format('/%s/master/%s', domain, domain), express.static(domain));

    app.get(util.format('/%s/*', domain), builder({
        root: process.cwd() + '/' + domain,
        path: util.format('/%s/master/index', domain)
    }));
});

app.listen(process.env.PORT, function () {
    console.log('cdn app listening on port %s', process.env.PORT);
});