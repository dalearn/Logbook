var database = require('./database.js');

exports.authenticate = function(username, password) {
    //Return login session token if credentials are valid, else return nothing.
    if (password === database.getUserPassword(username)) {//need to add hashing algorithm
        var token = 'generate random token here';//need to add token generation
        database.setUserToken(username, token);
        return token;
    }
    else {
        return '';
    }
}

exports.isAuthenticated = function(username, token) {
    //Return:  true = authenticated, false = not authenticated
    if (token === database.getUserToken(username)) {
        return true;
    }
    else {
        return false;
    }
}
