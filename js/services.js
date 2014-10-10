var adminurl = "http://mafiawarloots.com/91street/index.php/json/";

var myservices = angular.module('myservices', [])

.factory('MyServices', function ($http, $location) {
    
    var useremail ="";
    var uservalue = {};
    return {
        getuseremail: function() {
            return useremail;
        },
        setuseremail: function(user) {
            useremail = user;
        },
        getbrandsbycategory: function (id) {
            return $http.get(adminurl + 'getstorebycategory', {
                params: {
                    id: id
                }
            });
        },
        getbranddetails: function (id, userid) {
            return $http.get(adminurl + 'getstorebystoreid?id='+ id + '&userid=' + userid, {});
        },
        search: function (search) {
            return $http.get(adminurl + 'getbrandsearch?brand=' + search, {});
        },
        rating: function (userid, storeid, rating) {
            return $http.get(adminurl + 'addrating?userid=' + userid + '&storeid=' + storeid + '&rating=' + rating , {});
        },
        like: function (userid, storeid, like) {
            return $http.get(adminurl + 'addlike?userid=' + userid + '&brandid=' + storeid + '&like=' + like , {});
        },
        registeruser: function (firstname, lastname, email, password) {
            return $http.get(adminurl + 'createuser?name=' + firstname + '&sirname=' + lastname + '&email=' + email + '&password=' + password, {});
        },
        loginuser: function (email, password) {
            return $http.get(adminurl + 'checkfrontendlogin?email=' + email + '&password=' + password, {});
        },
        setuser: function (userdata) {
            var user = userdata;
            $.jStorage.set("user", userdata);
        },
        getuser: function(){
            var userdata = user = $.jStorage.get("user")
            return userdata;
           // var user = $.jStorage.g
        },
    }
});