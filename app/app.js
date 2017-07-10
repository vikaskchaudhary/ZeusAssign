'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'appRouter',
  'userController',
  'shareUserDataSvc',
  'userSvc',
    'ngTable',
  'myApp.version'
]).constant('COMMON_CONFIG', {
      apiUrl: 'http://localhost:8080/assign/rest/'          //Local
});
