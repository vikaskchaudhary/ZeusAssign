/**
 * Created by Vikas.Chaudhary on 07-07-2017.
 */
angular.module('appRouter', ['ngRoute']).config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'html/user/manage_user.html',
            controller: 'userCtrl',
            resolve: {
                test: function ($route) { $route.current.params.activeTabVal = 1; }
            }
        }).when('/create_new_user', {
        templateUrl : 'html/user/create_new_user.html',
        controller: 'userCtrl',
        resolve: {
            test: function ($route) { $route.current.params.activeTabVal = 1; }
        }

    }).when('/manage_user', {
        templateUrl : 'html/user/manage_user.html',
        controller: 'userCtrl',
        resolve: {
            test: function ($route) { $route.current.params.activeTabVal = 1; }
        }

    }).when('/edit_user', {
        templateUrl : 'html/user/edit_user.html',
        controller: 'userCtrl',
        resolve: {
            test: function ($route) { $route.current.params.activeTabVal = 1; }
        };

});


