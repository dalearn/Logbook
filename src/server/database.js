// SETUP
var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var config = require('./config.json');
var url = 'mongodb://' + config.database.username + ':' + config.database.password + '@' + config.database.server + ':' + config.database.port + '/' + config.database.name;
var db;

exports.init = function (callback) {
    mongo.connect(url, { useNewUrlParser: true }, function(err, db_) {
        if (err) throw err;
        console.log('Connected to database successfully.');
        db = db_.db(config.database.name);
        callback();
    });
}


// FUNCTIONS
exports.getUserPassword = function(username) {
    var result = 'hash here';
    return result;
}

exports.getUserToken = function(username) {
    var result = 'token here';
    return result;
}

exports.setUserToken = function(username) {

}

exports.getIDList = function(lowerLimit, upperLimit, callback) {

    db.collection('data').find().sort({ _id: -1 }).skip(lowerLimit).limit(upperLimit - lowerLimit).toArray(function(err, res) {
        if (err) console.log(err);
        rtrn = [];
        for (i in res) {
            rtrn.push({ _id:res[i]._id, count:res[i].entries.length, timestamp:res[i]._id.getTimestamp()});
        }
        callback(rtrn);
    });
}

exports.getID = function(id, callback) {
    db.collection('data').findOne({ _id: ObjectId(id) }, function(err, res) {
        if (err) console.log(err);
        var temp = res;
        temp.timestamp = res._id.getTimestamp();
        callback(temp);
    });
}

exports.getEntryInID = function(id, index, callback) {
    db.collection('data').findOne({ _id: ObjectId(id) }, function(err, res) {
        if (err) {
            console.log(err);
        }
        var temp = res.entries[index];
        temp._id = id;
        callback(temp);
    });
}

exports.createNewID = function(callback) {
    var id = new ObjectId();
    var template = {
        _id:id,
        entries:[]
    }
    db.collection('data').insertOne(template, function(err, res) {
        if (err) {
            console.log(err);
            callback('');
        }
        else {
            callback(id.toHexString());
        }
    });
}

exports.addEntryToID = function(id, entry, callback) {
    db.collection('data').updateOne({ _id:ObjectId(id) }, { $addToSet:{ 'entries':entry }}, function(err, res) {
        if (err) {
            console.log(err);
            callback('FAILURE');
        }
        else {
            callback('SUCCESS');
        }
    });
}
