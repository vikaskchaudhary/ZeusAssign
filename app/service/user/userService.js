angular.module('userSvc',[])
    .factory('UserDataFactory', ['$http','COMMON_CONFIG', function($http,COMMON_CONFIG) {

        var urlBase =COMMON_CONFIG.apiUrl+"user";
        var dataFactory = {};
        var requestParam={};

        dataFactory.getUser = function (userId) {
            return $http.get(urlBase + '/getUser',{"userId":userId});
        };

        dataFactory.getUsers = function () {
          return $http.get(urlBase+'/getUsers')
        };

        dataFactory.saveUser = function (user) {
            return $http.post(urlBase+'/create', user);
        };
        dataFactory.deleteUser = function (id) {
            return $http.post(urlBase+'/deleteUser', {id:id});
        };



        return dataFactory;
    }]).run(function($http) {
        $http.defaults.headers.common["content-type"] ="application/Json";
});

