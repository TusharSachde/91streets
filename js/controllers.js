angular.module('starter.controllers', ['ionic', 'myservices', 'ngCordova'])

.controller('HomeCtrl', function ($scope, $stateParams, $ionicModal, $timeout, MyServices, $ionicSlideBoxDelegate) {
    $scope.loginData = {};
    
    // Create the login modal
    $scope.checkButton = function(check) {
        var page = 'login';
        if (check == 'register')
        {
            page = "register";
            $scope.modal.hide();
        }
        else
        {
            page = "login";
        }
        $ionicModal.fromTemplateUrl('templates/'+page+'.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    }
    
    $scope.userdata = user = $.jStorage.get("user");
    //Page opening, login modal if empty jStorage
    if(!$scope.userdata)
    {
        $scope.checkButton('login');
    };
    
    //Register User
    var onregistersuccess = function(data,status) {
        $scope.loginData.email = data.email;
        $scope.loginData.password = data.passsword;
        console.log(data);
        $scope.checkButton('login');
        
    }
    $scope.submitRegister = function(data)
    {
        MyServices.registeruser(data.name, data.lastname, data.email, data.password).success(onregistersuccess)
    };
    
    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };
    // Open the login modal
    $scope.showlogin = function () {
        $scope.modal.show();
    };
    
    // Slider Home Tab
    $scope.nextSlide = function () {
        $ionicSlideBoxDelegate.next();
    };
    $scope.prevSlide = function () {
        $ionicSlideBoxDelegate.previous();
    };
    
    var loginsuccess = function(data, status)
    {
        if(data != "false")
        {
            $scope.userdata = data;
            MyServices.setuser($scope.userdata);
            $scope.closeLogin();
        };
        
    };
    
    $scope.doLogin = function(userdata)
    {
        var useremail = userdata.email;
        var password = userdata.password;        
        MyServices.loginuser(useremail, password).success(loginsuccess)
    };
    
    //Logout function
    $scope.logout = function()
    {
        $.jStorage.flush();
        $scope.userdata = {};
        MyServices.setuser($scope.userdata);
        $.jStorage.deleteKey("user");
    };

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

.controller('StoreListCtrl', function ($scope, $cordovaGeolocation, $stateParams, $ionicPopup, MyServices) {

    //Alert
    $scope.showAlert = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Unable to find location',
            template: 'Please turn on your GPS'
        });
    };

    //Location
    $cordovaGeolocation
        .getCurrentPosition()
        .then(function (position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            $scope.location = position.coords;

        }, function (err) {
            $scope.showAlert();
        });
    
    //Get brands by category API
    var categoryId = $stateParams.cid;
    var onbrandbycategorysuccess = function (data, status) {
        $scope.brands = data;
    }
    MyServices.getbrandsbycategory(categoryId).success(onbrandbycategorysuccess);
    
    
    //Search
    var onsearchsuccess = function (data, status) {
        $scope.brands = data;
    };
    $scope.doSearch = function(data) {
        MyServices.search(data).success(onsearchsuccess);
    };
    
    $scope.clearSearch = function() {
        console.log("Click");
        $scope.datasearch = '';
    };
})

.controller('StorePageCtrl', function ($scope, $stateParams, MyServices) {
    var brandId = $stateParams.bid;
    var ongetbrandsuccess = function (data, status) {
        $scope.branddetails = data.store;
        $scope.newarrivals = data.newin;
    }
    MyServices.getbranddetails(brandId).success(ongetbrandsuccess);

    $scope.sendtowebsite=function(website) {
        console.log(website);
        window.open(website, '_system');
    }
    
})

.controller('FavoritesCtrl', function ($scope) {})

.controller('SearchCtrl', function ($scope) {
    
})

.controller('RatingCtrl', function ($scope, $timeout) {

    // set the rate and max variables
    $scope.rate = 3;
    $scope.max = 5; 


})

.controller('PhotoSliderCtrl', function ($scope, $stateParams, MyServices, $ionicModal, $ionicSlideBoxDelegate) {
    $ionicModal.fromTemplateUrl('templates/image-slider.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function (index2) {

        $scope.modal.show();
        // Important: This line is needed to update the current ion-slide's width
        // Try commenting this line, click the button and see what happens

        $ionicSlideBoxDelegate.start();
        $ionicSlideBoxDelegate.update();
        for (var i = 0; i < 20; i++) {
            $ionicSlideBoxDelegate.previous();
        }
        for (var i = 0; i < index2; i++) {
            $ionicSlideBoxDelegate.next();
        }

    };

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function () {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
        // Execute action
    });
    $scope.$on('modal.shown', function () {
        console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function () {
        $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function () {
        $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function (index) {
        $scope.slideIndex = index;
    };
})

;