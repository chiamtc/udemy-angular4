var express= require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/', function(req,res,next){
	const user = new User({firstName: req.body.firstName, lastName: req.body.lastName, 
		email:req.body.email, password: bcrypt.hashSync(req.body.password)});
	user.save(function(err,result){
		if(err){
			return res.status(500).json({
				title: 'Error signing up',
				error: err
			});
		}

		res.status(200).json({
			title:'Sign up succeed',
			obj: result
		});
	});
});

router.post('/signin',function(req,res,next){
	User.findOne({email:req.body.email},function(err,user){
		if(err){
			return res.status(500).json({
				title:'Error',
				error:err
			});
		}
		if (!user){
			return res.status(401).json({
				title:'Authentication failed',
				error: {message:'invalid login credentials'}
			})
		}

		if(!bcrypt.compareSync(req.body.password, user.password)){
			return res.status(401).json({
				title: 'Authentication failed',
				error: {message: 'invalid login credentials'}
			});
		}

		var token = jwt.sign({user:user}, 'secret', {expiresIn: 7200});

		res.status(200).json({
			title:'User found!',
			message: 'User authenticated',
			token:token,
			userId : user.id
		});
	});
});


module.exports = router;