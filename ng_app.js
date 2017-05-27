angular.module('app', ['ngRoute','app.controller','app.service'])

.config(function($routeProvider) {
  $routeProvider

  .when('/dashboard', {
    templateUrl : 'dashboard.html',
    controller  : 'dashboardCtrl'
  })

  .otherwise({redirectTo: '/dashboard'});
})