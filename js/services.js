var adminurl = "http://mafiawarloots.com/91street/index.php/json/";

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
        getbrandsbycategory: function (id) {
            return $http.get(adminurl + 'getstorebycategory', {
                params: {
                    id: id
                }
            }, {
                withCredentials: true
            });
        },
        getbranddetails: function (id) {
            return $http.get(adminurl + 'getstorebystoreid', {
                params: {
                    id: id
                }
            }, {
                withCredentials: true
            });
        },
        search: function (search) {
            return $http.get(adminurl + 'getbrandsearch?brandname=' + search, {});
        },
        rating: function (userid, storeid, rating) {
            return $http.post(adminurl + 'addrating?userid=' + userid + '&storeid=' + storeid + 'rating' + rating , {}, {
                withCredentials: true
            });
        },
        getfavorites: function (user) {
            return $http.get(adminurl + 'showfavorites?user=' + user, {}, {
                withCredentials: true
            });
        },
        like: function (userid, storeid, like) {
            return $http.post(adminurl + 'addlike?userid=' + userid + '&storeid=' + storeid + 'like' + rating , {}, {
                withCredentials: true
            });
        },
        authenticate: function () {
            return $http.post(adminurl + 'authenticate', {}, {
                withCredentials: true
            });
        },
        registeruser: function (firstname, lastname, email, password) {
            return $http.get(adminurl + 'createuser?name=' + firstname + '&sirname=' + lastname + '&email=' + email + '&password=' + password, {});
        },
        loginuser: function (email, password) {
            return $http.get(adminurl + 'checkfrontendlogin?email=' + email + '&password=' + password, {});
        },
        logout: function () {
            return $http.post(adminurl + 'logout', {}, {
                withCredentials: true
            });
        },
    }
});