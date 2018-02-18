angular.module('movieCtrl',['movieService'])

.controller('MovieController',function(Movie,$location,$routeParams,$rootScope){

	var vm=this;
  
   
	Movie.all()
	    .success(function(data){
            console.log("in controller");
	    	vm.movies=data;
	    	console.log("in controller");
	    });
       



   vm.moviename=$routeParams.id;
   console.log(vm.moviename);


   Movie.getmovie(vm.moviename)
       .success(function(data){
         console.log(data);
       	vm.movie=data;
vm.avail=parseInt(vm.movie.availability);
console.log("available"+vm.avail);
       });



vm.check=function(){
  console.log("in function check"+vm.qty);

if(vm.qty > vm.avail){
  console.log(vm.qty);
  console.log(vm.movie['availability']);
vm.available=false;
}
else
{
   console.log(vm.qty);

vm.available= true;
}
};
var ids=new Array();
console.log("length of array is"+ids.length);
vm.reduceseat=function(id){

var p=0;


for(var i=0;i<(ids.length+1);i++){
  if(ids[i]==id){
    var index=ids.indexOf(id);
    ids.splice(index,1);
p=1;
  }
}
if(p==0){
  ids.push(id);

}
console.log("length of array is"+ids.length);
console.log("array is"+ids);

 // vm.avail=vm.avail-1;
  /*console.log("selected seat "+id);
  vm.movie.seats[id]="true";
  console.log("changed to"+ vm.movie.seats[id]);
  Movie.updatemovie(vm.movie)
     .success(function(){
      console.log("success saving updated seats");
     });*/
};

var count=0;
vm.book=function(){

  if(ids.length==vm.qty){
    $rootScope.q=vm.qty;
for(var i=0;i<(ids.length+1);i++){
 vm.movie.seats[ids[i]]="true";

}

vm.movie.availability=vm.movie.availability-ids.length;

Movie.updatemovie(vm.movie)
     .success(function(){
      console.log("success saving updated seats");
     });
    $location.path('/confirm/'+vm.movie.name);
}

else
{
  alert("you hav not selected required no of seats or you hav not entered the quantity");
 // $location.path('/seat').search({name:vm.movie.name});
}
}

vm.isbooked=function(id){
  //console.log(id);
  //console.log(vm.movie.seats[id]);
  if(vm.movie.seats[id]=="true")
  return true;
else
  return false;
}


 vm.back = function () {
        window.history.back();
    };
});




