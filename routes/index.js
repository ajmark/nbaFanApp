var mongo = require("../models/mymongo.js");

exports.headlines = function(req, res){
  res.render('../views/index.ejs', {title:"headlines"});
};

exports.fanmap = function(req, res){
  res.render('../views/fanmap.ejs', {title:"fanmap"});
};

exports.get = function(req, res){
		mongo.find( "nba", 
		            "teams", 
		            req.query,
		            function(model) {
		              res.render('index', {title: 'teams', obj: model});
		              }
		            );
}

exports.put = function(req, res){
		mongo.insert( "nba", 
		              "teams", 
		              req.body,
		              function(model) {
		                res.render('index', {title: 'teams', obj: model});
		                }
		              );
}
