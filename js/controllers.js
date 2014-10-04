//angular.module('starter.controllers', [])
angular.module('starter.controllers', ['ionic','myservices','ngCordova'])

.controller('HomeCtrl', function ($scope, $stateParams, MyServices) {
    $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next();
    };
    $scope.prevSlide = function() {
        $ionicSlideBoxDelegate.previous();
    };
    
    $scope.categorydata = [];
    var ongetcategoriessuccess = function (data, status) {
        console.log(data);
        $scope.categorydata = data;
    };
    MyServices.getcategories().success(ongetcategoriessuccess);
    
})

.controller('NotificationCtrl', function ($scope) {})

.controller('SettingCtrl', function ($scope) {})

.controller('ShoppingCtrl', function ($scope) {
    $scope.oneAtATime = true;
    $scope.clothing = [{
        name: "Casual Wear",
        type: "false"
    }, {
        name: "Formal Wear",
        type: "false"
    }, {
        name: "Party Wear",
        type: "false"
    }, {
        name: "Sports Wear",
        type: "false"
    }];
})

.controller('StoreListCtrl', function ($scope, $cordovaGeolocation, $ionicPopup) {

    //Alert
    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Unable to find location',
            template: 'Please turn on your GPS'
        });
    };
    
    //Location
    $cordovaGeolocation
    .getCurrentPosition()
    .then(function (position) {
        var lat  = position.coords.latitude
        var long = position.coords.longitude
        }, function(err) {
        $scope.showAlert();
    });



})

.controller('StorePageCtrl', function ($scope) {})

.controller('FavoritesCtrl', function ($scope) {});