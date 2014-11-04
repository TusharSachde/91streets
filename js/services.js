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
        getstorebycategoryoffers: function (id) {
            return $http.get(adminurl + 'getstorebycategoryoffers', {
                params: {
                    id: id
                }
            });
        },
        saveshoppingbag: function (bigbagplan) {
            return $http.get(adminurl + 'saveshoppingbag?user=' + bigbagplan.user + '&category=' + bigbagplan.category, {});
        },
        getshoppingbag: function (id) {
            return $http.get(adminurl + 'getshoppingbag?user='+id, {});
        },
        getallstoresbybrandid: function (id) {
            return $http.get(adminurl + 'getallstoresbybrandid?id='+id, {});
        },
        beforeeditmall: function (id) {
            return $http.get(adminurl + 'beforeeditmall?id='+id, {});
        },
        mallcategorystore: function (id,mid) {
            return $http.get(adminurl + 'mallcategorystore?id='+id+"&mid="+mid, {});
        },
        addstorelike: function (user,store) {
            return $http.get(adminurl + 'addstorelike?user='+user+"&store="+store, {});
        },
        mallcategories: function (id) {
            return $http.get(adminurl + 'mallcategories?id='+id, {});
        },
        getuserlike: function (id) {
            return $http.get(adminurl + 'getuserlike?user='+id, {});
        },
        getallstoresdiscount: function () {
            return $http.get(adminurl + 'getallstoresdiscount', {});
        },
        getallmalls: function () {
            return $http.get(adminurl + 'getallmalls', {});
        },
        getallbrands: function () {
            return $http.get(adminurl + 'getallbrands', {});
        },
        getsubcategory: function (id) {
            return $http.get(adminurl + 'getsubcategory?id='+id, {});
        },
        getstorebycategories: function (id) {
            return $http.get(adminurl + 'getstorebycategories?id='+id, {});
        },
        getcatarraystoreoffer: function (catarray) {
            return $http.get(adminurl + 'getcatarraystoreoffer?catarray='+catarray, {});
        },
        getcatarraystore: function (catarray) {
            return $http.get(adminurl + 'getcatarraystore?catarray='+catarray, {});
        },
        getcategory: function () {
            return $http.get(adminurl + 'getmaincategory', {});
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