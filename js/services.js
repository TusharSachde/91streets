var adminurl = "http://mafiawarloots.com/91street/index.php/";

var myservices = angular.module('myservices', [])

.factory('MyServices', function ($http, $location) {
    
    var useremail ="";
    return {
        getuseremail: function() {
            return useremail;
        },
        setuseremail: function(user) {
            useremail = user;
        },
        getcategories: function () {
            return $http.get(adminurl + 'site/getallcategories', {});
        },
    }
});