
var util = require("util");

//db/:collection/:operation/:document
var doError = function(e) {
        util.debug("ERROR: " + e);
        throw new Error(e);
    }

/******************************************************************
 *  Credentials
 *****************************************************************/
var mongodb = require('mongodb');
var db = new mongodb.Db('nodejitsu_ajmark_nodejitsudb4031015487',
  new mongodb.Server('ds045988.mongolab.com', 45988, {})
);
db.open(function (err, db_p) {
  if (err) { throw err; }
  db.authenticate('nodejitsu_ajmark', '2e5umvm44oh9jbq5nva6ak137j', function (err, replies) {
    // You are now connected and authenticated.
  });
});
/******************************************************************/

// INSERT
exports.insert = function(collection, query, callback) {


        db.collection(collection).insert(query, {
            safe: true
        }, function(err, crsr) {
            callback(crsr);
        });
}

// FIND
exports.find = function(collection, query, callback) {
         var crsr = db.collection(collection).find(query);
        crsr.toArray(function(err, docs) {
            if (err) doError(err);
            callback(docs);
        });
 }

// UPDATE
exports.update = function(collection, query, callback) {
          db.collection(collection).update(JSON.parse(query.find), JSON.parse(query.update), {
            new: true
        }, function(err, crsr) {
            if (err) doError(err);
            callback('Update succeeded');
        });
  }
