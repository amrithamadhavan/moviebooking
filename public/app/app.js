angular.module('myApp',['appRoutes','mainCtrl','authService','userCtrl','userService','movieService','movieCtrl'])


.config(function($httpProvider){

	$httpProvider.interceptors.push('AuthInterceptor');
})