angular.module('mainCtrl',['authService'])


.controller('MainController',function($rootScope,$location,Auth){


var vm=this;

vm.loggedIn=Auth.isLoggedIn();



$rootScope.$on('$routeChangeStart',function(){

	vm.loggedIn=Auth.isLoggedIn();

	Auth.getUser()
	      .then(function(data){

	      	vm.user=data.data;
            //console.log(vm.user);
	      });
});

vm.doLogin=function(){

	vm.processing=true;
	
	vm.error='';

    Auth.login(vm.loginData.username,vm.loginData.password)
    .success(function(data){

    	vm.processing=false;

    	Auth.getUser()
    	    .then(function(data){

    	    	vm.user=data.data;
    	    });
    	    if(data.success)
    	    	$location.path('/');
    	    else
             {  alert("invalid username or password");
    	    	vm.error=data.message;
            }
    });
}

vm.doLogout=function(){
	Auth.logout();
	$location.path('/logout');
}


});