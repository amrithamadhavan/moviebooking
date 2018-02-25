var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var MovieSchema=new Schema({

	name:{type:String,required:true,index:{unique:true}},
	director:String,
	cast:String,
	review:String,
	rating:String,
	availability:String,
	seats:Object
});

module.exports=mongoose.model('Movie',MovieSchema);