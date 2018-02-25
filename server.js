var express=require('express');
var bodyParser=require('body-parser');
var morgan=require('morgan');
var config=require('./config');
var mongoose=require('mongoose');
var app=express();
mongoose.connect(config.database,function(err){
	if(err)
	{
		console.log(err);
	}
	else
	{
		console.log('connected to the database');
	}
});




app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

var api=require('./app/routes/api')(app,express);
app.use('/api',api);


app.get('*',function(req,res){
	res.sendFile(__dirname + '/public/app/views/index.html');
});

app.listen(config.port,function(err){
	if(err)
	console.log(err);
    else
<<<<<<< HEAD
	console.log("listening on port 3080");
=======
	console.log("listening on port 3000");
>>>>>>> d8edf3d84c5325a77a3c5d1d8e32aadc9aaa4e60
});