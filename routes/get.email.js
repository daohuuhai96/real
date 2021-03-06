var express = require('express');
var router = express.Router();
var passport = require("passport");
const assert = require('assert');
var mongo = require("mongodb");
const infoCompany = require("./infoCompany.js");
const pathMongodb = require("./mongodb.path.js");

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.user&&req.user.id===infoCompany.idAdmin){
		mongo.connect(pathMongodb,(err, db)=>{
			db.collection("emailClient").find().sort({'Ngày':-1}).toArray((err, result)=>{
				db.close();
				res.render("email-happy-real",{
					"result":result, 
					"user" 	:req.user
				})
			})
		})
	}else{
		res.redirect("/error")
	}
});

module.exports = router;