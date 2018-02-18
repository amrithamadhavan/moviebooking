angular.module('appRoutes',['ngRoute'])


.config(function($routeProvider,$locationProvider){

$routeProvider

     /*.when('/',{

     	templateUrl:'app/views/pages/home.html',
     	 controller:'MainController',
        controllerAs:'main'
        
     })*/
     .when('/',{

     	templateUrl:'app/views/pages/movies.html',
     	controller:'MovieController',
     	controllerAs:'movie'
        
     })

     .when('/login',{

     	templateUrl:'app/views/pages/login.html'
     })

     .when('/signup',{
       
       	templateUrl:'app/views/pages/signup.html'

     })

     .when('/movie/:id',{

     	templateUrl:'app/views/pages/review.html',
     	controller:'MovieController',
     	controllerAs:'movie'
        
     })
     .when('/seat/:id',{

     	templateUrl:'app/views/pages/seating.html',
     	controller:'MovieController',
     	controllerAs:'movie'
        
     })
     .when('/confirm/:id',{
        
        templateUrl:'app/views/pages/confirm.html',
          controller:'MovieController',
          controllerAs:'movie'

     })


     $locationProvider.html5Mode(true);
  
})