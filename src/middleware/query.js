var mongodb = require('mongodb');
var client = mongodb.MongoClient,
ObjectId = mongodb.ObjectId;

var connect = function (databaseId, callback) {
    var uri = "mongodb://user:user@10.0.3.3/" + databaseId;
    client.connect(uri, function (err, db) {
        if (err) return callback(err, null);
        callback(null, db);
    });
}

var query = {
    getData: function (params, callback) {
        connect(params.database, function (err, db) {
            if (!params.module) {
                db.collections(function (err, data) {
                    if (err) return callback(err, null);
                    db.close();
                    var names = [];
                    data.forEach(function (item) {
                        names.push(item.s.name)
                    })
                    callback(null, names)
                })
            } else {
                var collection = db.collection(params.module);
                var obj = {};
                if(params.id) obj._id = ObjectId(params.id)
                collection.find(obj).toArray(function (err, data) {
                    if (err) return callback(err, null);
                    db.close()
                    callback(null, data);
                });
            }
        })
    },
    setData: function(params, data, callback){
        connect(params.database, function (err, db) {
            if(!params.module) return callback("No Module", null);
            var collection = db.collection(params.module);
            collection.insertMany(data, function (err, result) {
                callback(null, result.insertedIds);
            });
        })
    }
};

module.exports = query;