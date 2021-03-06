var Movie=require('../models/movie.js');

var User=require('../models/user');



var config=require('../../config');

var secretKey=config.secretKey;

var jsonwebtoken=require('jsonwebtoken');

function createToken(user){

	var token=jsonwebtoken.sign({

		id:user._id,
		name:user.name,
		username:user.username
	},secretKey,{

		expiresIn:1440
	});

	return token;
}

module.exports=function(app,express){

var api=express.Router();


api.post('/signup',function(req,res)
	{

		var user=new User({
		name:req.body.name,
		username:req.body.username,
		password:req.body.password
	});

		var token=createToken(user);

	user.save(function(err){

		if(err){
			res.send(err);
			return;
		}
		res.json({
            success:true,
			message:'user has been created',
		    token:token
		});
	});

});


api.get('/users',function(req,res){


	User.find({},function(err,users){

		if(err){
			res.send(err);
			return;
		}
		res.json(users);
	});
});



api.post('/login',function(req,res){

	User.findOne({ 
     
        username:req.body.username

	}).select('name username password').exec(function(err,user){


		if(err) throw err;

		if(!user)
		{
			res.json({message:"user does not exist"});
		}
		else if(user){
			var validPassword=user.comparePassword(req.body.password);

			if(!validPassword){
				res.send({message:"invalid password"});
			}
           else{

           	var token=createToken(user);

           	res.json({
           		success:true,
           		message:"successfully logged in!!",
           		token:token
           	});
           }
       }
	});
});


//middleware

api.use(function(req,res,next){

	console.log("somebody logged in");
	
	var token=req.body.token || req.param('token') || req.headers['x-access-token'];

     if(token){

     	jsonwebtoken.verify(token,secretKey,function(err,decoded){

     		if(err){

     			res.status(403).send({success:false,message:"failed to authenticate"});
     		}
     		else{
     			req.decoded=decoded;
     			next();
     		}
     	});
     }
     else{

     	res.status(403).send({success:false,message:"no token provided"});
     }
});


/*api.get('/',function(req,res){

	res.json("hello home page");
});*/


api.get('/all_movies',function(req,res){

	Movie.find({},function(err,movies){

		if(err){
			res.send(err);
		}
         console.log("in api");
		res.json(movies);
	});
});


api.post('/get_movie',function(req,res){

	console.log(req.body.name);


	Movie.findOne({ 
     
        name:req.body.name

	}).select('name review director availability cast seats').exec(function(err,movie){
         if(err)
         	res.send(err);
         else
         	res.json(movie);

	});
});

api.post('/update_seat',function(req,res){

console.log(req.body.seats);

Movie.findOne({name:req.body.name},function(err,doc){
	doc.seats=req.body.seats;
	doc.availability=req.body.availability;
	doc.save();
})
	//Movie.update({name:req.body.name},{$set:{seats:req.body.seats}},callback)
});



 api.get('/me',function(req,res){

  	res.json(req.decoded);
  });    
return api;
}