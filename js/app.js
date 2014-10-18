angular.module('starter', ['ionic', 'ui.bootstrap', 'starter.controllers','ngCordova' ])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })

    .state('tab.home', {
        url: '/home',
        views: {
            'tab-home': {
                templateUrl: 'templates/tab-home.html',
                controller: 'HomeCtrl'
            }
        }
    })

    .state('tab.favorites', {
        url: '/favorites',
        views: {
            'tab-favorites': {
                templateUrl: 'templates/tab-favorites.html',
                controller: 'StoreListCtrl'
            }
        }
    })

    .state('tab.notification', {
        url: '/notification',
        views: {
            'tab-notification': {
                templateUrl: 'templates/tab-notification.html',
                controller: 'NotificationCtrl'
            }
        }
    })

    .state('tab.setting', {
        url: '/setting',
        views: {
            'tab-setting': {
                templateUrl: 'templates/tab-setting.html',
                controller: 'HomeCtrl'
            }
        }
    })

    .state('tab.shopping', {
        url: '/shopping',
        views: {
            'tab-shopping': {
                templateUrl: 'templates/tab-shopping.html',
                controller: 'ShoppingCtrl'
            }
        }
    })

    .state('tab.shoppingbag', {
        url: '/shoppingbag',
        views: {
            'tab-shopping': {
                templateUrl: 'templates/tab-shoppingbag.html',
                controller: 'ShoppingBagCtrl'
            }
        }
    })

    .state('tab.storelist', {
        url: '/storelist/:cid',
        views: {
            'tab-home': {
                templateUrl: 'templates/store-list.html',
                controller: 'StoreListCtrl'
            }
        }
    })

    .state('tab.storepage', {
        url: '/storelist/storepage/:bid',
        views: {
            'tab-home': {
                templateUrl: 'templates/store-page.html',
                controller: 'StorePageCtrl'
            }
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

})

.filter('imagepath', function () {
    return function (input) {
        if (input == null) {
            //return "http://www.wohlig.co.in/zibabackend/uploads/2239a46835dc42bc7a6acade8f8517e9.jpg";
        } else {
            return "http://mafiawarloots.com/91street/uploads/" + input;
        }
    };
});

var rad = function(x) {
    return x * Math.PI / 180;
};

var getDistance = function(lat1,long1,lat2,long2) {
    var R = 6378.137; // Earth’s mean radius in km
    var p1={lat:lat1,lng:long1};
    var p2={lat:lat2,lng:long2};
    
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in km
};