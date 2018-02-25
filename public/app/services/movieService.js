angular.module('movieService',[])


.factory('Movie',function($http){

var movieFactory={};



movieFactory.all=function(){
    console.log("in service");
	return $http.get('/api/all_movies');
}

movieFactory.getmovie=function(name){
	console.log(name +"in service");
	return $http.post('/api/get_movie',{
		name:name
	})
}

movieFactory.updatemovie=function(mv){
	console.log(mv.name);
	console.log(mv.seats);
	return $http.post('/api/update_seat',{
		name:mv.name,
		seats:mv.seats,
		availability:mv.availability
	})
}

return movieFactory;

});