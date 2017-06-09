angular.module('app', ['ngRoute','app.controller','app.service'])

.config(function($routeProvider) {
  $routeProvider

  .when('/dashboard', {
    templateUrl : 'dashboard.html',
    controller  : 'dashboardCtrl'
  })
  .when('/rainform', {
    templateUrl : 'rainform.html',
    controller  : 'rainformCtrl'
  })
  .when('/landslide', {
    templateUrl : 'landslide.html',
    controller  : 'landslideCtrl'
  })
  .when('/drought', {
    templateUrl : 'drought.html',
    controller  : 'droughtCtrl'
  })
  .when('/fire', {
    templateUrl : 'fire.html',
    controller  : 'fireCtrl'
  })

  .otherwise({redirectTo: '/dashboard'});
})