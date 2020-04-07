var util = require('util');
var express = require('express');
var builder = require('component-middleware');
var cors = require('cors');

var app = express();

app.use(cors());
app.use(express.static('public'));

var domains = ['accounts', 'admin', 'autos', 'www', 'realestates'];

app.get('/facebook/token', function (req, res) {
    res.json({
        access_token: '123456'
    });
});

app.get('/facebook/profile', function (req, res) {
    res.json({
        email: 'ruchira.wageesha@gmail.com',
        first_name: 'Ruchira',
        last_name: 'Wageesha'
    });
});

app.get('/facebook/dialog/oauth', function (req, res) {
    var uri = 'http://development.accounts.serandives.com:4000/auth/oauth?code=123456';
    res.redirect(uri);
});

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
