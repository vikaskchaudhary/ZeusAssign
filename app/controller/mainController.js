/*
angular.module('mainHomeCtrl',[]).controller("mainCtrl",['$route','$scope','$rootScope','LoginDataFactory','UserDataFactory','ShareUserDataService','$cookies','$window',function ($route,$scope,$rootScope,LoginDataFactory,UserDataFactory,ShareUserDataService,$cookies,$window) {
    $scope.activeTab=1;

    $scope.sessionActive= false;
    $rootScope.pageUpdated=false;
    $scope.changeTab= function(tabNum,pageName){
        $rootScope.pageName=pageName;
    };


    $scope.$on('$routeChangeStart', function (event, next, current) {
        $scope.sessionActive=$cookies.get('sessionVar');

        if (!current && $scope.sessionActive) {
            $scope.userDetailsForLoggedinUser();
        }
        checkForAccessRightsAndAddHeaders(next);
    });


    $scope.$on('$includeContentLoaded', function() {
        window.setTimeout( function() { $('[data-toggle="popover"]').popover(); }, 1000 );
    });

    function checkForAccessRightsAndAddHeaders(next){
        var acccessingPath=next.$$route.originalPath;
        var accessRights=$cookies.getObject('accessRights')
        if(acccessingPath=="/create_lesson" || acccessingPath=="/select_lesson" || acccessingPath=="/selected_template"){
            $rootScope.pageName='Create Lesson Plan';
            if(!accessRights.createLesson){
                $window.location.href='#/';
            }
        }else if(acccessingPath=="/lesson_flow"){
            $rootScope.pageName='Lesson Plan Flow';
            if(!accessRights.lessonFlow){
                $window.location.href='#/';
            }
        }else if(acccessingPath=="/edit_lesson"){
            $rootScope.pageName='Edit Lesson Plan';
            if(!accessRights.editLesson){
                $window.location.href='#/';
            }
        }else if(acccessingPath=="/manage_user" || acccessingPath=="/create_new_user" || acccessingPath=="/edit_user"){
            $rootScope.pageName='Manage User';
            if(!accessRights.manageUser){
                $window.location.href='#/';
            }
        } else if(acccessingPath=="/manage_sound" || acccessingPath=="/capture_sound" || acccessingPath=="/review_sound_lib"){
            $rootScope.pageName='Manage Sound';
            if(!accessRights.manageSound){
                $window.location.href='#/';
            }
        }

    };
    $scope.$on('$locationChangeStart', function(event) {

        if ($scope.pageUpdated) {
            if(!confirm('Do you want to continue with out saving your changes')){
                $scope.pageUpdated=false;
                event.preventDefault();
            }
        }
    });



    /!* Check login*!/

    $scope.loggedInUserDetails={};
    $scope.loggedInUserDetails.user="User";
    $scope.login = function () {
        $scope.loginUser.sessionStatus = false;
        var emailId = $scope.loginUser.email;
        $rootScope.displaySessionTimeout =false;
        var passwd = $scope.loginUser.password;
        $cookies.put('loggedinUserId', emailId);
        LoginDataFactory.getAuthenticationToken(emailId, passwd).then(function (response) {
            $cookies.put('access_token',response.data.access_token);
            $scope.userDetailsForLoggedinUser();

            $scope.errorStatus=null;

        }, function (error) {
            console.log(eval(error));

            if(error.status==400){
                $scope.errorStatus =error.data.error_description;
            }  else {
                $scope.status = 'Error loging! ' + error.message;
                $scope.errorStatus = 'Invalid user name or password !! ';
            }
            $cookies.remove("sessionVar");
            $cookies.remove("loggedinUserId");
            $cookies.remove("access_token");

        });


    }


    var setUserRole= function ()
    {
        // var userDetails
        if(ShareUserDataService.getLoggedInUser().userType=="Teacher")
            $scope.loggedInUserDetails.userTabName="Student";
        else
            $scope.loggedInUserDetails.userTabName="User";
    };
    $scope.logout = function(){
        $scope.sessionActive = false;
        ShareUserDataService.setLoggedInUser(null);
        $cookies.remove("sessionVar");
        $cookies.remove("loggedInUserDetails");
        $cookies.remove("loggedinUserId");
        $cookies.remove("access_token");
        location.reload();
    };

    $scope.userDetailsForLoggedinUser = function ()
    {
        var accessToken = $cookies.get('access_token');
        UserDataFactory.getUserDetails( $cookies.get("loggedinUserId")).then(function (response) {
            $scope.loggedInUserDetails=response.data.data;
            ShareUserDataService.setLoggedInUser($scope.loggedInUserDetails);

            $cookies.putObject('accessRights', $scope.loggedInUserDetails.acccessRight);
            $rootScope.accessRights = $scope.loggedInUserDetails.acccessRight;
            //ShareLoginDataService.setUsers($scope.loggedInUserDetails);
            setUserRole();
            // console.log(eval("Logged in user "+" "+  $scope.loggedInUserDetails));
            $scope.sessionActive = true;
            $window.location.href='#dashboard';
            $cookies.put('sessionVar', $scope.sessionActive);
        }, function (error) {
            $scope.status = 'Error retrieving users! ' + error.message;

        }) ;
    }



}]);


*/
