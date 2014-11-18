var lat = 0;
var long = 0;
angular.module('starter.controllers', ['ionic', 'myservices', 'ngCordova'])
    .controller('HomeCtrl', function ($scope, $stateParams, $ionicModal, $timeout, MyServices, $ionicSlideBoxDelegate, $ionicPopover, $location) {

    
        //opensearch
    analytics.trackView('Home');
    analytics.trackEvent('Page', 'Load', 'Home', 101);
        $scope.opensearch = function(){
            console.log("search");
            $location.url("tab/search");
        }
    
        //opensearch
        //start slide from api.....

        var bannersuccess = function (data, status) {
            console.log(data);
            $scope.slider = data;
            $ionicSlideBoxDelegate.update();
//            $scope.$apply();4
            
        };
        MyServices.getbanner().success(bannersuccess);

        //end slide fron api....
        
        $scope.loginData = {};
        $scope.loginlogouttext = "Log Out";
        $scope.shoppingtext = false;
        $scope.userdata = user = $.jStorage.get("user");
        console.log($scope.userdata);
        $scope.userpro = [];

        var getshoppingbag1 = function (data, status) {
            if (data == 1) {
                $scope.shoppingtext = false;
            } else {
                $scope.shoppingtext = true;
            }
        };
        var before = function (data, status) {
            console.log(data);
            $scope.userpro = data;

        };
        //update profile
        var userupdated = function (data, status) {
            console.log(data);
        };
        $scope.updatepro = function (userpro) {
            MyServices.updateuserpro(userpro, $scope.userdata.id).success(userupdated);
        }

        //update profile
        if ($scope.userdata) {
            MyServices.isshopping($scope.userdata.id).success(getshoppingbag1);
            MyServices.findoneuser($scope.userdata.id).success(before);
        }
        $scope.gotoshoppingbag = function () {
            $location.url("tab/shoppingbag");
        }
        console.log("my data");
        console.log($scope.userdata);
        if ($scope.userdata) {
            $scope.loginlogouttext = "Log Out";
        } else {
            $scope.loginlogouttext = "Login";
        }


        //Google Maps API Lat Long


        function showPosition2(position) {
            var latlon = position.coords.latitude + "," + position.coords.longitude;
            console.log("Positions:.........");
            console.log(position.coords);
            $scope.coords = position.coords;
            lat = position.coords.latitude;
            long = position.coords.longitude;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition2, showError);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }


        console.log("my lat long");
        console.log(lat);
        console.log(long);
        var getcategorysuccess = function (data, status) {
            console.log(data);
            $scope.category = data;
            /*            $scope.category.leftcategory={};
            $scope.category.rightcategory={};
            
            for(var i=0;i<data.length;i++)
            {
                if(i%2==0){
                    $scope.category.leftcategory=data[i];
                    $scope.category.rightcategory=data[i+1];
                }
            }
            console.log($scope.category);
    */
        };

        $scope.shoppingip = function () {
            console.log(lat);
        };

        MyServices.getcategory().success(getcategorysuccess);

        // Create the login modal
        $scope.checkButton = function (check) {
            var page = 'login';
            if (check == 'register') {
                page = "register";
                $scope.modal.hide();
            } else {
                page = "login";
            }
            $ionicModal.fromTemplateUrl('templates/' + page + '.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();
            });
        }

        $scope.userdata = user = $.jStorage.get("user");

        console.log($scope.userdata);

        var getcityname = function (data, status) {
            console.log(data);
            $scope.city = data;
        };
        if ($scope.userdata) {
            MyServices.getonecity($scope.userdata.city).success(getcityname);
        }
        //Page opening, login modal if empty jStorage
        if (!$scope.userdata) {
            $scope.checkButton('login');
        };

        //Register User
        var onregistersuccess = function (data, status) {
            console.log(data);
            $scope.loginData.email = data.email;
            $scope.loginData.password = data.passsword;
            console.log(data);
            $scope.checkButton('login');
            //            $scope.modal.hide();

        }
        $scope.submitRegister = function (data) {
            MyServices.appsignup(data.name, data.lastname, data.email, data.password, data.city).success(onregistersuccess)
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

        var loginsuccess = function (data, status) {
            if (data != "false") {
                $scope.userdata = data;
                MyServices.setuser($scope.userdata);
                $scope.closeLogin();
            };

        };

        $scope.doLogin = function (userdata) {
            var useremail = userdata.email;
            var password = userdata.password;
            MyServices.loginuser(useremail, password).success(loginsuccess)
        };

        //Logout function
        $scope.logout = function () {
            $.jStorage.flush();
            $scope.userdata = {};
            MyServices.setuser($scope.userdata);
            $scope.loginlogouttext = "Login";
            $.jStorage.deleteKey("user");
        };


        // Popover Share
        $ionicPopover.fromTemplateUrl('templates/share-popover.html', {
            scope: $scope,
        }).then(function (popover) {
            $scope.popover = popover;
        });
        $scope.openPopover = function ($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function () {
            $scope.popover.hide();
        };
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function () {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function () {
            // Execute action
        });


        //    get all city
        var getcity = function (data, status) {
            console.log(data);
            $scope.cities = data;
        };
        MyServices.viewcity().success(getcity);
        //Display Main categories


        

        // Share
        $scope.share = function () {
            console.log('Share');
            window.plugins.socialsharing.share('Download 91streets: https://play.google.com/store/apps/details?id=com.nintyonestreets.nintyonestreets');
        };

    })

.controller('FavoritesStoreCtrl', function ($scope, MyServices, $ionicModal, $timeout, $location) {

    $scope.user = MyServices.getuser();
    $scope.brands = {};
    console.log($scope.user);
    $scope.addlike = 0;

    $scope.gotofavorites = function () {
        console.log("gotofavoriteslist clicked");
        $location.url("tab/favorites");
    }

    var favoritelisting = function (data, status) {
        console.log(data);
        $scope.brands = data;
        
        analytics.trackView('Favorite Store ');
        analytics.trackEvent('Page', 'Load', 'Favorite Store ', 102);
        for (var i = 0; i < data.length; i++) {
            if(data[i].logo=="")
            {
                $scope.brands[i].logo="logo.png";
            }
            
            $scope.brands[i].mylike = data[i].like.length;
            for (var j = 0; j < data[i].like.length; j++) {
                if (data[i].like[j].user == $scope.user.id) {
                    $scope.brands[i].userlike = 1;
                } else {
                    $scope.brands[i].userlike = 0;
                }
            }
        }
        console.log("liklikliklik");
        console.log($scope.brands);

    };
    MyServices.favoritebrands().success(favoritelisting);

    $scope.likeclass = "liked";
    $scope.nolikeclass = "";
    var ilike = function (data, status) {
        console.log(data);
    };
    $scope.like = function (brand) {
        console.log(brand);
        if (brand.userlike == 0) {
            brand.userlike = 1;
            MyServices.like($scope.user.id, brand.id, brand.userlike).success(ilike);
        } else {
            brand.userlike = 0;
            MyServices.like($scope.user.id, brand.id, brand.userlike).success(ilike);
        }
        console.log(brand.userlike);
        //$scope.$apply();
    }

})
    .controller('NotificationCtrl', function ($scope, MyServices, $ionicModal, $timeout, $location) {
        $scope.userdata = user = $.jStorage.get("user");
        console.log($scope.userdata);
        var getnotification = function (data, status) {
            console.log(data);
            $scope.notification = data;
            analytics.trackView('Notification ');
            analytics.trackEvent('Page', 'Load', 'Notification ', 103);
        };
        MyServices.notification($scope.userdata.id).success(getnotification);
    })

.controller('SettingCtrl', function ($scope) {})
.controller('Search', function ($scope, MyServices, $stateParams, $ionicModal, $timeout, $location) {
    
    $scope.myorder = 'dist';
    $scope.search=1;
    $scope.bybrandmall=1;
    $scope.myorderorder = false;

    $scope.user = MyServices.getuser();
    if($scope.user==null)
    {
        $scope.ucity=0;
    }
    console.log($scope.user);
    $scope.brandmalldiv = false;
    
    var allmalls = function (data, status) {
        console.log(data);
        $scope.malls=data;
        for(var i=0;i<data.length;i++)
        {
            if (data[i].latitude == null & data[i].longitude == null) {
                $scope.malls[i].dist = 0;
            } else {
                $scope.malls[i].dist = (getDistance(data[i].latitude, data[i].longitude, lat, long)).toFixed(1);
            }
            if($scope.malls[i].logo=="" || $scope.malls[i].logo==null)
            {
                $scope.malls[i].logo="logo.png";
            }
            
        }
    };
    
    var brnadsuccess = function (data, status) {
        
        console.log(data);
        $scope.brands=data;
        
        
//google analytics    
            analytics.trackView('Search ');
            analytics.trackEvent('Page', 'Load', 'Search ', 104);
//google analytics
    
        
        for(var i=0;i<data.length;i++)
        {
            if($scope.brands[i].logo=="" || $scope.brands[i].logo==null)
            {
                $scope.brands[i].logo="logo.png";
            }
            
        }
        
    };
    
    $scope.brandmall = function (search) {
        
        $scope.bybrandmall=search;
        
        
    }
    
    $scope.doSearch = function (searchdata)
    {
        if($scope.bybrandmall==1)
        {
            $scope.brandmalldiv = false;
            MyServices.getallbrandssearch(searchdata).success(brnadsuccess);
        }else{
            $scope.brandmalldiv = true;
            MyServices.searchbymall($scope.ucity,searchdata).success(allmalls);
        }
    }
    
    //get lat long
    
     function showPosition2(position) {
        var latlon = position.coords.latitude + "," + position.coords.longitude;
        console.log("Positions");
        console.log(position.coords);
        $scope.coords = position.coords;
        lat = position.coords.latitude;
        long = position.coords.longitude;
//        MyServices.notificationbrandid($stateParams.id).success(notificationbrand);
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition2, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    
})

    .controller('InNotificationCtrl', function ($scope, MyServices, $stateParams, $ionicModal, $timeout, $location) {

    
    
        var notificationbrand = function (data, status) {
            console.log(data);
            $scope.notifications = data;
            
            
        
//google analytics    
            analytics.trackView('In Notification ');
            analytics.trackEvent('Page', 'Load', 'In Notification ', 105);
//google analytics
    
            
        for (var i = 0; i < data.length; i++) {
            if (data[i].latitude == null & data[i].longitude == null) {
                $scope.notifications[i].dist = 0;
            } else {
                $scope.notifications[i].dist = (getDistance(data[i].latitude, data[i].longitude, lat, long)).toFixed(1);
            }
        }
            
        };
        
    
        function showPosition2(position) {
        var latlon = position.coords.latitude + "," + position.coords.longitude;
        console.log("Positions");
        console.log(position.coords);
        $scope.coords = position.coords;
        lat = position.coords.latitude;
        long = position.coords.longitude;
        MyServices.notificationbrandid($stateParams.id).success(notificationbrand);
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition2, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

    

    })

.controller('ShoppingCtrl', function ($scope, MyServices, $ionicModal, $timeout, $location) {
    $scope.clothing = [];
    $scope.bigbagplan = [];
    var check1 = 0;

    
    
    var getshoppingbagg = function (data, status) {
        console.log("inin big bag........");
        console.log(data);
        $scope.bigbag = data;
        
//google analytics    
            analytics.trackView('Shopping ');
            analytics.trackEvent('Page', 'Load', 'Shopping ', 106);
//google analytics
    
        fillbagtocategory();
    };


    $scope.user = MyServices.getuser();
    console.log("user loggedin");
    if ($scope.user == null) {

        $location.url('/home');

    } else {
        MyServices.getshoppingbag($scope.user.id).success(getshoppingbagg);
        console.log("hey, im logged in");
    }

    
    function fillbagtocategory() {
        if (check1 == 1) {

            for (var i = 0; i < $scope.bigbag.length; i++) {
                for (var j = 0; j < $scope.categories.length; j++) {
                    for (var k = 0; k < $scope.categories[j].subcategory.length; k++) {
                        if ($scope.bigbag[i].id == $scope.categories[j].subcategory[k].id) {
                            $scope.categories[j].subcategory[k].type = true;
                            $scope.categories[j].font="assertive";
                        }
                    }
                }
            }

            console.log("Exec hua");
        } else {
            check1++;
            console.log("Plus hua");
        }
    };
    var clearsuccess = function (data, status){
        alert("cleared");
        MyServices.getshoppingbag($scope.user.id).success(getshoppingbagg);
    };
    $scope.clearshoppingbag=function(){
        console.log($scope.user.id);
        MyServices.clearshoppingbag($scope.user.id).success(clearsuccess);
    }
    var allcategory = function (data, status) {

        console.log("in allcategory");
        console.log(data);
        $scope.categories = data;
        fillbagtocategory();
        //        for(var i=0;i<$scope.categories.length;i++)
        //        {
        //            $scope.subcat={
        //                name:$scope.categories[i].name,
        //                type:"false",
        //                parent:$scope.categories[i].parent
        //            };
        //            $scope.clothing.push($scope.subcat);
        //        }
        //        console.log("pushed data clothing");
        //        console.log($scope.clothing);

    };
    MyServices.getcategory().success(allcategory);
    var subcategory = function (data, status) {
        $scope.clothing = data;
    };
    $scope.getsubcategory = function (id) {
        console.log("my id is");
        console.log(id);
        MyServices.getsubcategory(id).success(subcategory);
    };

    $scope.bigbag = [];
    $scope.addtobag = function (cloths) {

        if ($scope.bigbag.length == 0) {
            $scope.bigbag.push(cloths);
        } else {
            for (var i = 0; i < $scope.bigbag.length; i++) {
                if ($scope.bigbag[i].id == cloths.id) {
                    $scope.bigbag.splice(i, 1);
                    $scope.in = 0;
                } else {
                    $scope.in = 1;

                }
            }

            if ($scope.in == 1) {
                $scope.bigbag.push(cloths);
            }
        }

    };


    ///////////////////////////////////////////////////shopping bag submit///////////////////////////////////////////////////////////////////

    var shoppingplansaved = function (data, status) {
        //        console.log(data);
        console.log("Shopping Plan Submited");
        $location.url("/tab/shoppingbag");
    };

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };



    $scope.submitplan = function () {
        $scope.bigbagplan.category = $scope.bigbag[0].id;
        for (var i = 1; i < $scope.bigbag.length; i++) {
            $scope.bigbagplan.category += "," + $scope.bigbag[i].id;
        }
        $scope.bigbagplan.user = $scope.user.id;
        MyServices.saveshoppingbag($scope.bigbagplan).success(shoppingplansaved);
    };

    $scope.showshoppingbag = function () {
        $location.url("/tab/shoppingbag");
    };

    /*    $scope.oneAtATime = true;
        $scope.clothing = [{
            name: "Casual Wear",
            type: "true"
        }, {
            name: "Formal Wear",
            type: "false"
        }, {
            name: "Party Wear",
            type: "false"
        }, {
            name: "Sports Wear",
            type: "false"
        }];*/
})

.controller('DiscountCtrl', function ($scope, $cordovaGeolocation, $stateParams, $ionicPopup, MyServices, $ionicModal) {


    $scope.cat = [];
    $scope.catarray = [];

    $scope.user = MyServices.getuser();
    if ($scope.user == null) {
        $scope.city = 0;
    } else {
        $scope.city = $scope.user.city;
    }

    //    clear filter and sort

    $scope.clear = function () {
        MyServices.getallstoresdiscount($scope.city).success(getdiscount);
    };

    var allmaincategory = function (data, status) {
        console.log(data);
        $scope.allcat = data;
    };
    MyServices.getcategory().success(allmaincategory);

    //filter
    $scope.filter = function (cat) {

        if ($scope.cat.length == 0) {
            $scope.cat.push(cat);
            //            $scope.catarray = cat.id;
        } else {
            for (var i = 0; i < $scope.cat.length; i++) {
                if ($scope.cat[i].id == cat.id) {
                    $scope.cat.splice(i, 1);
                    $scope.in = 0;
                } else {
                    $scope.in = 1;

                }
            }

            if ($scope.in == 1) {
                $scope.cat.push(cat);
                //                $scope.catarray += "," + cat.id;
            }
        }

        console.log($scope.cat);
        //        console.log($scope.catarray);
        
        
       


    };

    $scope.sort = "othersort.html";
    $scope.myorder = 'dist';
    $scope.myorderorder = false;
    $scope.changesort = function (order, orderorder) {
        $scope.myorder = order;
        $scope.myorderorder = orderorder;
    };
 //Search
    var onsearchsuccess = function (data, status) {
        console.log(data);
        $scope.listing = {};
        $scope.listing = data;
        for (var i = 0; i < data.length; i++) {
            $scope.listing[i].image=data[i].brandlogo;
            $scope.listing[i].id=data[i].storeid;
        }
    }
    $scope.doSearch = function (data) {
        MyServices.search(data).success(onsearchsuccess);
    };

    $ionicModal.fromTemplateUrl('templates/discountsort.html', {
        id: '4',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.oModal4 = modal;
    });
    $scope.showsortsort = function () {
        $scope.oModal4.show();
    };

    var getdiscount = function (data, status) {
        console.log("SUCCESS FUNTION");
        console.log(data.length);
        console.log(data);
        $scope.listing = [];
        $scope.listing = data;
        
//google analytics    
            analytics.trackView('Discount ');
            analytics.trackEvent('Page', 'Load', 'Discount ', 107);
//google analytics
    
        scroll = 1;
        $scope.loadMore();
        for (var i = 0; i < data.length; i++) {
            if (data[i].image == null) {
                $scope.listing[i].image = "logo.png";
            }
            if (data[i].latitude == null & data[i].longitude == null) {
                $scope.listing[i].dist = 0;
            } else {
                $scope.listing[i].dist = (getDistance(data[i].latitude, data[i].longitude, lat, long)).toFixed(1);
            }
        };
    };



    MyServices.getallstoresdiscount($scope.city).success(getdiscount);



    // loadmore discount
    $scope.dicountItem = [];
    var change = 10;
    var counter = 0;
    var scroll = 0;

    $scope.loadMore = function () {
        console.log("LOAD MORE");
        if (scroll == 1) {
            var sum = counter + change;
            if (sum > $scope.listing.length) {
                sum = $scope.listing.length;
            };
            console.log(sum);
            for (var i = counter; i <= sum; i++) {
                if ($scope.listing[i]) {
                    $scope.dicountItem.push($scope.listing[i]);
                    console.log($scope.dicountItem);
                };
            };
            counter += change + 1;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };
    };

    function showPosition2(position) {
        var latlon = position.coords.latitude + "," + position.coords.longitude;
        console.log("Positions");
        console.log(position.coords);
        $scope.coords = position.coords;
        lat = position.coords.latitude;
        long = position.coords.longitude;
        //MyServices.getallstoresdiscount().success(getdiscount);
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition2, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }



    //Sort Modal
    $ionicModal.fromTemplateUrl('templates/allfilter.html', {
        id: '3',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.oModal3 = modal;
    });
    $scope.showSort = function () {
        $scope.oModal3.show();
    };


    //    var catarraysuccess = function (data, status) {
    //        console.log(data);
    //        $scope.brands = data;
    //    };

    $scope.hideSort = function (dep) {
        console.log($scope.cat);
        $scope.catarray = $scope.cat[0].id;
        for (var i = 1; i < $scope.cat.length; i++) {
            $scope.catarray += "," + $scope.cat[i].id;
        }
        $scope.oModal3.hide();
        MyServices.getcatarraystoreoffer($scope.catarray).success(getdiscount);
    };
})

.controller('ShoppingBagCtrl', function ($scope, $cordovaGeolocation, $stateParams, $ionicPopup, MyServices) {

    var getshoppingbagg = function (data, status) {
        console.log(data);
        
        
//google analytics    
            analytics.trackView('Shopping Bag ');
            analytics.trackEvent('Page', 'Load', 'Shopping Bag ', 108);
//google analytics
    
        
        for (var i = 0; i < data.length; i++) {
            $scope.listing = data;
            $scope.listing[i].dist = (getDistance(data[i].latitude, data[i].longitude, lat, long)).toFixed(1);
            console.log($scope.listing[i].dist);
        }
        console.log($scope.listing);
    };

    $scope.user = MyServices.getuser();
    if ($scope.user == null) {

        $location.url('/home');

    } else {
        MyServices.getstorebycategories($scope.user.id).success(getshoppingbagg);
    }



})

