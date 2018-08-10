//INCLUDES
var http = require('http');
var express = require('express');
var app = express();

var auth = require('./server/auth.js');
var page = require('./server/page.js');
var database = require('./server/database.js');
var config = require('./server/config.json');

var PORT = config.logbook.port;


//SERVER
app.listen(PORT);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var checkAuthentication = function (req, res, next) {
    if (auth.isAuthenticated('username', 'token here')) {//still need to figure out how to send auth token on every request
        next();
    }
    else {
        res.redirect('/login');
    }
}

app.get('/login', function(req, res) {
    if (!auth.isAuthenticated('username', 'token here')) {//still need to figure out how to send auth token on every request
        res.send(page.getPage('login'));
    }
    else {
        res.redirect('/');
    }
});

app.post('/login', function(req, res) {
    var token = auth.authenticate(req.email, req.password);
    if (auth.isAuthenticated(req.email, token)) {
        res.send('SUCCESS');
    }
    else {
        res.send('INVALID');
    }
});

app.use(checkAuthentication);//this gets run before every request

app.use('/components/pages', express.static('./src/client/components/pages'));

app.post('/data/page/:pageNumber', function(req, res) {//still need to finish
    database.getIDList(0, 50, function(res2) {
        res.send(res2);
    });
});

app.post('/data/id/:id/:index', function(req, res) {
    database.getEntryByID(req.params.id, req.params.index - 1, function(res2) {
        res.send(res2);
    });
});

app.post('/data/id/new', function(req, res) {
    database.createNewID();
    res.send();
});

app.get('*', function(req, res) {//any special pages should go above this catch-all.
    res.send(page.getPage('basic'));
    //database.createNewEntry('5b69c35ac2cc78c8979a8a9b', {'user':'frank', 'timestamp':new Date()});
});
