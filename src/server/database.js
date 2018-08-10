// DUMMY CODE //
var exampleObject = {
    data:[
        {
            id:'000000000000',
            entries:[{
                user:'fred',
                timestamp:'dd/mm/yyyy hh:mm:ss',
                data:[{
                        key:'key here',
                        value:'value here',
                        notes:'some notes'
                    }
                ]
            }]
        },
        {
            id:'111111111111',
            entries:[{
                user:'bob',
                timestamp:'dd/mm/yyyy hh:mm:ss',
                data:[{
                        key:'key2 here',
                        value:'value2 here',
                        notes:'some notes'
                    }
                ]
            },{
                user:'bill',
                timestamp:'dd/mm/yyyy hh:mm:ss',
                data:[{
                        key:'key3 here',
                        value:'value3 here',
                        notes:'some notes'
                    }
                ]
            }]
        }
    ]
}
/////////////////////////////////////

// SETUP
var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var config = require('./config.json');
var url = 'mongodb://' + config.database.username + ':' + config.database.password + '@' + config.database.server + ':' + config.database.port + '/' + config.database.name;
var db;

mongo.connect(url, { useNewUrlParser: true }, function(err, db_) {
    if (err) throw err;
    console.log('Connected to database successfully.');
    db = db_.db(config.database.name);
});

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
        callback(res);
    });
}

exports.getEntryByID = function(id, index, callback) {
    db.collection('data').findOne({ _id: ObjectId(id) }, function(err, res) {
        if (err) console.log(err);
        var temp = res.entries[index];
        temp._id = id;
        callback(temp);
    });
}

exports.createNewID = function() {
    var id = new ObjectId();
    var template = {
        _id:id,
        entries:[]
    }
    db.collection('data').insertOne(template, function(err, res) {
        if (err) {
            console.log(err);
        }
    });
}

exports.createNewEntry = function(id, entry) {
    db.collection('data').updateOne({ _id:ObjectId(id) }, { $addToSet:{ 'entries':entry }}, function(err, res) {
        if (err) {
            console.log(err);
        }
    });
}
