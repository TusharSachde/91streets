angular.module('starter', ['ionic', 'ui.bootstrap', 'starter.controllers' ])

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
                controller: 'FavoritesCtrl'
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
                controller: 'SettingCtrl'
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

    .state('tab.storelist', {
        url: '/storelist',
        views: {
            'tab-home': {
                templateUrl: 'templates/store-list.html',
                controller: 'StoreListCtrl'
            }
        }
    })

    .state('tab.storepage', {
        url: '/storelist/storepage',
        views: {
            'tab-home': {
                templateUrl: 'templates/store-page.html',
                controller: 'StorePageCtrl'
            }
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

});