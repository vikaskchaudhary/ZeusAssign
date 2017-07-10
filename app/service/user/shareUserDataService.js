angular.module('shareUserDataSvc',[]).service("ShareUserDataService", function () {

    var userDetails = null;
    var selectedUserId=0;

    return {

        getUsers: function() {
            return userDetails;
        },

        setUsers: function(user) {
            userDetails = user;
        },
        getSelectedUserId : function() {
            return selectedUserId;
        },

        setSelectedUserId: function(selectedId) {
            selectedUserId = selectedId;
        }
    }
});