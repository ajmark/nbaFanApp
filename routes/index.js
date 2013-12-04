var mongo = require("../models/mymongo.js");

exports.headlines = function(req, res){
  res.render('../views/index.ejs', {title:"headlines"});
};

exports.fanmap = function(req, res){
  res.render('../views/fanmap.ejs', {title:"fanmap"});
};

exports.get = function(req, res){
		mongo.find( "pins", 
		            req.query,
		            function(model) {
		            	res.json(model);
		            }
		);
}

exports.put = function(req, res){
	(checkUnique(req.body.c_id,
		function(){
			mongo.insert( "pins", 
						req.body, 
						function(model){ 
							return model;
						}
			)
		})
	)};

function checkUnique(c_id,callback) {
	mongo.find( "pins", 
		{"c_id":c_id},
		function(model){
			if (model.length < 1){
				callback();
			}
		});
}