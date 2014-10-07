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
        seach: function (search) {
            return $http.post(adminurl + 'getbrandsearch?brandname=' + search, {}, {
                withCredentials: true
            });
        },
        rating: function (userid, storeid, review) {
            return $http.post(adminurl + 'getbrandsearch?brandname=' + search, {}, {
                withCredentials: true
            });
        },
        showfavorites: function (user) {
            return $http.post(adminurl + 'showfavorites?user=' + user, {}, {
                withCredentials: true
            });
        },
        addtofavorites: function (user, product) {
            return $http.post(adminurl + 'addtofavorites?user=' + user + '&product=' + product, {}, {
                withCredentials: true
            });
        },
        authenticate: function () {
            return $http.post(adminurl + 'authenticate', {}, {
                withCredentials: true
            });
        },
        registeruser: function (firstname, lastname, email, password) {
            return $http.post(adminurl + 'registeruser?firstname=' + firstname + '&lastname=' + lastname + '&email=' + email + '&password=' + password, {}, {
                withCredentials: true
            });
        },
        loginuser: function (email, password) {
            return $http.post(adminurl + 'loginuser?email=' + email + '&password=' + password, {}, {
                withCredentials: true
            });
        },
        logout: function () {
            return $http.post(adminurl + 'logout', {}, {
                withCredentials: true
            });
        },
    }
});