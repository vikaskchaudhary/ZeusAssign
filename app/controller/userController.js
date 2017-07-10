angular.module('userController',[]).controller("userCtrl",['$scope','ShareUserDataService','UserDataFactory','$routeParams','$window','NgTableParams',function ($scope,ShareUserDataService,UserDataFactory,$routeParams,$window,NgTableParams) {


    $scope.$parent.activeTab = $routeParams.activeTabVal;
    $scope.editUser={};
    $scope.dataLoaded=false;
   if($scope.activeTab==1 ){
        loadUsers(null);
    }else if($scope.activeTab==2 ){
        loadUsers('edit');
    }
    function loadUsers(actionType){
       // $scope.$parent.userDetailsForLoggedinUser();
        $scope.selectedUserId=ShareUserDataService.getSelectedUserId();

                UserDataFactory.getUsers().then(function (response) {
                $scope.tmpUserDetails = response.data;
                $scope.userDetails=response.data;
                ShareUserDataService.setUsers($scope.userDetails);
                    if(actionType==='edit'){
                        UserDataFactory.getUser($scope.selectedUserId).then(function (response) {
                            $scope.status = '';
                            $scope.editUser=response.data;
                           }, function (error) {
                            $scope.status = 'Error retrieving users! ' + error.message;
                        });
                    }

                    $scope.tableParams = new NgTableParams({count: 15}, {dataset: $scope.userDetails,counts: []});
                    $scope.dataLoaded=true;
                }, function (error) {
                $scope.status = 'Error retrieving users! ' + error.message;
                $scope.dataLoaded=true;


            });

    }


    $scope.updateSelectedUserRow= function(user){
        $scope.selectedUserId=user.id;
        ShareUserDataService.setSelectedUserId($scope.selectedUserId);


    };

    $scope.saveUser = function(flag){
        console.log("In saveUser function : userController.js");

        var user= $scope.editUser;
        console.log(eval(user));
        UserDataFactory.saveUser(user).then(function (response) {
            console.log("After saveUser function : userController.js");
            $scope.status = 'Successfully Saved';
            // ShareUserDataService.setStatus($scope.status);
            $scope.savedData = response.data;
            console.log(eval( $scope.savedData));
            $window.location.href='#manage_user';
        }, function (error) {
            console.log(error.message);
            $scope.status = 'Error retrieving customers! ' + error.message;
        });
    };
    $scope.cancelUser = function(){

        if(!($scope.userEditorForm.$pristine))
        {
            if (confirm('Unsaved data will be lost')) {
                $window.location.href='#/';
            }
        }else
        {
            $window.location.href='#/';
        }

    };

    $scope.deleteUser = function(user,val){
        $scope.updateSelectedUserRow(user);
      UserDataFactory.getUser(user.id).then(function (response) {
              $scope.editUser=response.data;

       var user= $scope.editUser;
            UserDataFactory.deleteUser(user.id).then(function (response) {
                $scope.status = 'Successfully Saved';
              $scope.savedData = response.data;
                $window.location.href='#manage_user';
            }, function (error) {
                $scope.status = 'Error retrieving customers! ' + error.message;
            });
        }, function (error) {
            $scope.status = 'Error retrieving users! ' + error.message;
        });

    };

    function formatDate() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }





}]);
