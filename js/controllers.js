var lat = 0;
var long = 0;
angular.module('starter.controllers', ['ionic', 'myservices', 'ngCordova'])
    .controller('HomeCtrl', function ($scope, $stateParams, $ionicModal, $timeout, MyServices, $ionicSlideBoxDelegate, $ionicPopover, $location) {

        //start slide from api.....

        var bannersuccess = function (data, status) {
            console.log(data);
            $scope.slider = data;
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
        for (var i = 0; i < data.length; i++) {
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
            MyServices.like($scope.user.id, brand.brandid, brand.userlike).success(ilike);
        } else {
            brand.userlike = 0;
            MyServices.like($scope.user.id, brand.brandid, brand.userlike).success(ilike);
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
        };
        MyServices.notification($scope.userdata.id).success(getnotification);
    })

.controller('SettingCtrl', function ($scope) {})
    .controller('InNotificationCtrl', function ($scope, MyServices, $stateParams, $ionicModal, $timeout, $location) {

        var notificationbrand = function (data, status) {
            console.log(data);
            $scope.notifications = data;
        };
        MyServices.notificationbrandid($stateParams.id).success(notificationbrand);

    })

.controller('ShoppingCtrl', function ($scope, MyServices, $ionicModal, $timeout, $location) {
    $scope.clothing = [];
    $scope.bigbagplan = [];
    var check1 = 0;

    function fillbagtocategory() {
        if (check1 == 1) {

            for (var i = 0; i < $scope.bigbag.length; i++) {
                for (var j = 0; j < $scope.categories.length; j++) {
                    for (var k = 0; k < $scope.categories[j].subcategory.length; k++) {
                        if ($scope.bigbag[i].id == $scope.categories[j].subcategory[k].id) {
                            $scope.categories[j].subcategory[k].type = true;
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


    var getshoppingbagg = function (data, status) {
        console.log(data);
        $scope.bigbag = data;
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
    $scope.myorder = 'name';
    $scope.myorderorder = false;;
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
        scroll = 1;
        $scope.loadMore();
        for (var i = 0; i < data.length; i++) {
            if (data[i].image == null) {
                $scope.listing[i].image = "../assets/img/logo.png";
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

.controller('StoreDetailCtrl', function ($scope, $cordovaGeolocation, $stateParams, $ionicPopup, MyServices) {

    var onestore = function (data, status) {
        console.log(data);
        $scope.storedetails = {};
        $scope.storedetails = data;
        for (var i = 0; i < data.length; i++) {
            if (data[i].image == null) {
                $scope.storedetails[i].image = "../assets/img/logo.png";
            }
            $scope.storedetails[i].dist = (getDistance(data[i].latitude, data[i].longitude, lat, long)).toFixed(1);

        }
    };


    function showPosition2(position) {
        var latlon = position.coords.latitude + "," + position.coords.longitude;
        console.log("Position");
        console.log(position.coords);
        $scope.coords = position.coords;
        lat = position.coords.latitude;
        long = position.coords.longitude;
        MyServices.getstorebyid($stateParams.id).success(onestore);
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition2, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

    // Share
    $scope.share = function () {
        console.log('Share');
        window.plugins.socialsharing.share('Checkout ' + $scope.storedetails.brandname + ' on 91streets, Download 91streets: https://play.google.com/store/apps/details?id=com.nintyonestreets.nintyonestreets');
    }


})

.controller('StoreListCtrl', function ($scope, $cordovaGeolocation, $stateParams, $ionicPopup, MyServices, $ionicModal) {

    $scope.brands = [];
    $scope.userdata = user = $.jStorage.get("user");
    if ($scope.userdata) {
        $scope.ucity = $scope.userdata.city;
    } else {
        $scope.ucity = 0;
    }
    console.log($scope.userdata);
    var categoryId = $stateParams.cid;
    var scroll = 0;
    $scope.cat = [];
    $scope.discountstatus = 0;
    $scope.sort = "othersort.html";
    $scope.myorder = 'brandname';
    $scope.myorderorder = false;
    
    $scope.changesort = function (order, orderorder) {
        $scope.myorder = order;
        $scope.myorderorder = orderorder;
    };
    //show discount fucntion

    $scope.clear = function () {
        MyServices.getbrandsbycategory(categoryId, $scope.ucity).success(onbrandbycategorysuccess);
    }

    var getdiscount = function (data, status) {

        $scope.brands = data;
        for (var i = 0; i < data.length; i++) {
            $scope.brands[i].dist = (getDistance(data[i].latitude, data[i].longitude, lat, long)).toFixed(1);
            console.log($scope.brands[i].dist);
        }
        console.log($scope.brands);
        scroll = 1;
        $scope.loadMore();
        console.log(scroll);
    }

    $scope.showdiscount = function () {
        if ($scope.discountstatus == 0) {
            MyServices.getstorebycategoryoffers($stateParams.cid, $scope.ucity).success(getdiscount);
            $scope.discountstatus = 1;
        } else {
            MyServices.getbrandsbycategory(categoryId, $scope.ucity).success(onbrandbycategorysuccess);
            $scope.discountstatus = 0;
        }

    }

    //Get brands by category API
    var onbrandbycategorysuccess = function (data, status) {
        console.log("my data");
        $scope.brands = data;
        for (var i = 0; i < data.length; i++) {
            $scope.brands[i].dist = (getDistance(data[i].latitude, data[i].longitude, lat, long)).toFixed(1);
            //            console.log($scope.brands[i].dist);
        }
        scroll = 1;
        $scope.loadMore();
        console.log(scroll);
    };

    function showPosition2(position) {
        var latlon = position.coords.latitude + "," + position.coords.longitude;
        console.log("Positions:.........");
        console.log(position.coords);
        $scope.coords = position.coords;
        lat = position.coords.latitude;
        long = position.coords.longitude;
        MyServices.getbrandsbycategory(categoryId, $scope.ucity).success(onbrandbycategorysuccess);
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition2, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    };


    //    //ionic load more
    $scope.productItem = [];
    var change = 10;
    var counter = 0;
    //    $scope.brands = [];

    $scope.loadMore = function () {
        if (scroll == 1) {
            var sum = counter + change;
            if (sum > $scope.brands.length) {
                sum = $scope.brands.length;
            }
            for (var i = counter; i <= sum; i++) {
                if ($scope.brands[i]) {
                    $scope.productItem.push($scope.brands[i]);
                    console.log($scope.productItem);
                };
            };
            counter += change + 1;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };
    };

    //get sub category
    var subcategorysuccess = function (data, status) {
        console.log(data);
        $scope.subcat = data;
    };
    MyServices.getsubcategory(categoryId).success(subcategorysuccess);
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
    };

    //Sort Modal
    $ionicModal.fromTemplateUrl('templates/sort.html', {
        id: '1',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.oModal1 = modal;
    });
    $ionicModal.fromTemplateUrl('templates/othersort.html', {
        id: '2',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.oModal2 = modal;
    });
    $scope.showSort = function () {
        $scope.oModal1.show();
    };
    $scope.showsortsort = function () {
        $scope.oModal2.show();
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
        MyServices.getcatarraystore($scope.catarray, $scope.ucity).success(onbrandbycategorysuccess);
        $scope.oModal1.hide();
    };


    //Alert
    $scope.showAlert = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Unable to find location',
            template: 'Please turn on your GPS'
        });
    };

    //Location
    $cordovaGeolocation.getCurrentPosition()
        .then(function (position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            $scope.location = position.coords;

        }, function (err) {
            $scope.showAlert();
        });


    //Search
    var onsearchsuccess = function (data, status) {
        console.log(data);
        $scope.brands = data;
    };
    $scope.doSearch = function (data) {
        MyServices.search(data).success(onsearchsuccess);
    };

    $scope.clearSearch = function () {
        console.log("Click");
        $scope.datasearch = '';
    };

    // close modal
    $scope.closeModal = function () {
        $scope.oModal2.hide();
    };
})



.controller('StorePageCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout) {

    $scope.likediv=true;
    $scope.user={};
    $scope.user = MyServices.getuser();
    $scope.test = "Hello";
    $scope.storepagemsg = "";
    console.log("storage controller");
    //$scope.user = {};
    console.log("me user huu/....");
    console.log($scope.user);
    if ($scope.user == null) {
        console.log("returning null");
        $scope.userid = 0;
        console.log($scope.userid);
    }else{
        $scope.userid=$scope.user.id;
    }
    var brandId = $stateParams.bid;
    var ongetbrandsuccess = function (data, status) {
        console.log(data);
        $scope.branddetails = data.store;
        $scope.newarrivals = data.newin;
        $scope.reviews = data.review;
        $scope.offers = data.offers;4
        if(data.like==2)
        {
            $scope.likediv=false;
        }
        console.log("all reviews");
        if ($scope.reviews == "") {
            $scope.storepagemsg = "No Reviews";
        }
        data.averagerating = parseFloat(data.averagerating);
        var decval = data.averagerating - Math.floor(data.averagerating);
        if (decval < 0.5) {
            $scope.rate = Math.floor(data.averagerating);
        } else {
            $scope.rate = data.averagerating;
        }

        //like BRAND
        var likecount = data.like;
        $scope.checklike = likecount;
        console.log('Like Counter= ' + likecount);
        $scope.like = function (){
            
        }
        
        $scope.like = function () {

            if (likecount == 0 || !likecount) {
                likecount = 1;
                $scope.addfavPopup();
            } else {
                likecount = 0;
                $scope.remfavPopup();
            };
            $scope.checklike = likecount;
            if (!$scope.user.id || $scope.user.id == 0) {
                console.log("What did you do ?");
            } else {
                $scope.likeapi($scope.userid, $scope.branddetails.brandid, likecount);
            }

            console.log($scope.userid, $scope.branddetails.brandid, likecount);
            console.log('Like Counter=' + likecount + ' ' + $scope.checklike);
            console.log('Like Counter=' + likecount + ' ' + $scope.checklike);

        }
    }

    MyServices.getbranddetails(brandId, $scope.userid).success(ongetbrandsuccess);

    $scope.sendtowebsite = function (website) {
        window.open(website, '_system');
    }

    //like API
    var likesuccess = function (data, status) {
        console.log(data + 'Liked');
    };
    $scope.likeapi = function (userid, brandid, like) {
        MyServices.like(userid, brandid, like).success(likesuccess);
    }

    //rating API
    var ratesuccess = function (data, status) {

    };
    $scope.submitRate = function (userid, storeid, rating, review) {
        MyServices.rating(userid, storeid, rating, review).success(ratesuccess);
    }

    // Popups for favorites
    $scope.addfavPopup = function () {
        $scope.data = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<div class="text-center"><h1 class="ion-android-checkmark balanced"></h1><p>' + $scope.branddetails.brandname + ' added to favorites!</p>',
            title: 'Added to favorites!',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 1500);
    };

    $scope.remfavPopup = function () {
        $scope.data = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<div class="text-center"><h1 class="ion-android-close assertive"></h1><p>' + $scope.branddetails.brandname + ' removed from favorites!</p>',
            title: 'Removed from favorites!',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 1500);
    };

    // Share
    $scope.share = function () {
        console.log('Share');
        window.plugins.socialsharing.share('Checkout ' + $scope.branddetails.brandname + ' on 91streets, Download 91streets: https://play.google.com/store/apps/details?id=com.nintyonestreets.nintyonestreets');
    }

    // Share img
    $scope.shareImg = function (image) {
        console.log(imagepath + image);
        console.log(image);
        console.log(imagepath);
        window.plugins.socialsharing.share('Checkout ' + $scope.branddetails.brandname + ' on 91streets, Download 91streets: https://play.google.com/store/apps/details?id=com.nintyonestreets.nintyonestreets', null, imagepath + image);
    }
    $scope.user = MyServices.getuser();
    //Rating
    $scope.rate = 0;
    $scope.max = 5;
    $scope.readonly = true;
    $scope.showPopup = function () {
        $scope.data = {}
        var myPopup = $ionicPopup.show({
            template: '<rating ng-model="data.newrate" max="max" readonly="false"></rating> <textarea ng-model="data.newreview" class="review" placeholder="Please enter your review"></textarea>',
            title: 'Your Review',
            subTitle: 'Please enter your review',
            scope: $scope,
            buttons: [{
                text: 'Cancel'
            }, {
                text: '<b>Submit</b>',
                type: 'button-balanced',
                onTap: function (e) {
                    $scope.submitRate($scope.userid, $scope.branddetails.id, $scope.data.newrate, $scope.data.newreview);
                    console.log($scope.userid, $scope.branddetails.id, $scope.data.newrate, $scope.data.newreview);
                }
            }]
        });

    };

    //load more review
    $scope.seemore = "...See More";
    var reviewlosdsuccess = function (data, status) {
        $scope.reviews = data;
    };
    $scope.loadmorereview = function () {
        $scope.seemore = "";
        MyServices.reviewbystoreid($scope.branddetails.id).success(reviewlosdsuccess);
    }

})

.controller('BrandListCtrl', function ($scope, $stateParams, MyServices, $ionicModal, $ionicSlideBoxDelegate) {
    $scope.demo = "demo";

    var brnadsuccess = function (data, status) {
        console.log(data);
        $scope.brands = data;
    };
    MyServices.getallbrands().success(brnadsuccess);
})

.controller('FavoritesCtrl', function ($scope, $stateParams, MyServices, $ionicModal, $ionicSlideBoxDelegate, $location) {

    $scope.user = {};
    $scope.user = MyServices.getuser();
    console.log("My information");
    console.log($scope.user);
    $scope.favorites = {};
    var userlikes = function (data, status) {
        //        console.log(data);
        $scope.favorites = data;
        for (var i = 0; i < data.length; i++) {
            $scope.favorites[i].userlike = data[i].like.length;
        }
        console.log($scope.favorites);
    };
    if ($scope.user == null) {
        $location.url('/home');
    } else {
        MyServices.getuserlike($scope.user.id).success(userlikes);
    }


    $scope.gotofavoriteslist = function () {
        console.log("gotofavoriteslist clicked");
        $location.url("tab/favoritesstore");
    }

})

.controller('MallPageListCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $ionicModal, $ionicSlideBoxDelegate) {
    console.log($stateParams.mid);
    $scope.cat = [];

    //get sub category
    var subcategorysuccess = function (data, status) {
        console.log(data);
        $scope.subcat = data;
    };
    MyServices.getsubcategory($stateParams.id).success(subcategorysuccess);
    //filter
    $scope.filter = function (cat) {

        if ($scope.cat.length == 0) {
            $scope.cat.push(cat);
            $scope.catarray = cat.id;
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
                $scope.catarray += "," + cat.id;
            }
        }

        console.log($scope.cat);
        console.log($scope.catarray);


    };



    $scope.myorder = 'name';
    $scope.myorderorder = false;;
    $scope.changesort = function (order, orderorder) {
        $scope.myorder = order;
        $scope.myorderorder = orderorder;
    };


    //Sort Modal
    $ionicModal.fromTemplateUrl('templates/sort.html', {
        id: '1',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.oModal1 = modal;
    });
    $scope.showSort = function () {
        $scope.oModal1.show();
    };
    //Sort Modal
    $ionicModal.fromTemplateUrl('templates/discountsort.html', {
        id: '2',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.oModal2 = modal;
    });
    $scope.showsortsort = function () {
        $scope.oModal2.show();
    };

    var catarraysuccess = function (data, status) {
        console.log(data);
        $scope.malllist = data;
    };

    $scope.hideSort = function () {
        console.log($scope.cat);
        $scope.categoryarray = $scope.cat[0].id;
        for (var i = 1; i < $scope.cat.length; i++) {
            $scope.categoryarray += "," + $scope.cat[i].id;
        }
        console.log($scope.categoryarray);
        $scope.oModal1.hide();
        MyServices.mallcategorystorecat($scope.categoryarray, $stateParams.mid).success(catarraysuccess);
    };

    var mallpagesuccess = function (data, status) {
        console.log(data);
        $scope.malllist = data;
    };
    MyServices.mallcategorystore($stateParams.id, $stateParams.mid).success(mallpagesuccess);

    $scope.clear = function () {
        MyServices.mallcategorystore($stateParams.id, $stateParams.mid).success(mallpagesuccess);
    }
})

.controller('MallistCtrl', function ($scope, $stateParams, MyServices, $ionicModal, $ionicSlideBoxDelegate) {
    $scope.demo = "demo";
    $scope.malls = [];
    $scope.search=false;
    var mallsuccess = function (data, status) {
        $scope.search=false;
        scroll = 1;
        console.log(data);
        $scope.malls = data;
        $scope.loadMore();
        for (var i = 0; i < data.length; i++) {
            
//            $scope.malls[i].link="#/tab/malllist/mallpage/"+data.id;
            if (data[i].latitude != null) {
                $scope.malls[i].dist = (getDistance(lat, long, data[i].latitude, data[i].longitude)).toFixed(1);
            } else {
                $scope.malls[i].dist = 0;
            }
            if (data[i].logo == "") {
                $scope.malls[i].logo = "logo.png";
            }
        }
    };

    //Search
    var onsearchsuccess = function (data, status) {
        $scope.search=true;
        console.log(data);
        $scope.malls = {};
        $scope.malls = data;
        for (var i = 0; i < data.length; i++) {
            $scope.malls[i].logo=data[i].brandlogo;
            $scope.malls[i].id=data[i].mall;
        }
    }
    $scope.doSearch = function (data) {
        MyServices.search(data).success(onsearchsuccess);
    };

    
    $scope.user = MyServices.getuser();
    console.log($scope.user);
    if ($scope.user == null) {
        $scope.usercity = 0;
    } else {
        $scope.usercity = $scope.user.city;
    }

    MyServices.getallmalls($scope.usercity).success(mallsuccess);
    //ionic load more
    $scope.mallItem = [];
    var change = 10;
    var counter = 0;
    var scroll = 0;

    $scope.loadMore = function () {
        if (scroll == 1) {
            var sum = counter + change;
            if (sum > $scope.malls.length) {
                sum = $scope.malls.length;
            }
            for (var i = counter; i <= sum; i++) {
                if ($scope.malls[i]) {
                    $scope.mallItem.push($scope.malls[i]);
                    console.log($scope.mallItem);
                };
            };
            counter += change + 1;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };
    };

    // malls api
    function showPosition2(position) {
        var latlon = position.coords.latitude + "," + position.coords.longitude;
        console.log("Positions:.........");
        console.log(position.coords);
        $scope.coords = position.coords;
        lat = position.coords.latitude;
        long = position.coords.longitude;

        //start user is not logged in get city from lat long


        $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyDqN3t8_Nb04MF7jTufq-bkEHogZxyeUHY", {}, function (data) {
            console.log(data);
            data = data.results[0].address_components;
            for (var i = 0; i < data.length; i++) {
                if (data[i].types[0] == "locality") {
                    $scope.city = data[i].long_name;
                }
            }
            console.log("location city");
            console.log($scope.city);

        });


        //ende user is not logged in get city from lat long


    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition2, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }



})


.controller('PageOffersCtrl', function ($scope, $stateParams, MyServices, $ionicModal, $ionicSlideBoxDelegate) {

    var successoffers = function (data, status) {
        console.log(data);
        $scope.offers = {};
        $scope.offers = data;
        for (var i = 0; i < data.length; i++) {
            if (data[i].image == null) {
                $scope.offers[i].image = "img/logo.png";
            }
        }
    };
    MyServices.mallalloffers($stateParams.id).success(successoffers);

    // Share
    $scope.share = function (name, header) {
        window.plugins.socialsharing.share('Checkout ' + name + ', ' + header + ' on 91streets, Download 91streets: https://play.google.com/store/apps/details?id=com.nintyonestreets.nintyonestreets');
    };

})


.controller('MallPageCtrl', function ($scope, $stateParams, MyServices, $ionicModal, $ionicSlideBoxDelegate) {
    $scope.demo = "demo";
    console.log("mall id");
    console.log($stateParams.id);
    $scope.mallid = $stateParams.id;
    $scope.mall = [];
    $scope.mallcategory = [];
    var successoffers = function (data, status) {
        console.log(data);
        $scope.offers = data;
    };
    MyServices.malloffers($stateParams.id, 2).success(successoffers)
    var mallsuccess = function (data, status) {
        console.log(data.mall);
        $scope.mall = data.mall;
        if (data.mall.logo == "") {
            $scope.mall.logo = "img/logo.png";
        }
    };
    MyServices.beforeeditmall($stateParams.id).success(mallsuccess);

    var mallcategorysuccess = function (data, status) {
        //        console.log("mall category");
        //        console.log(data);
        for (var i = 0; i < data.length; i++) {
            if (data[i].name != null & data[i].parent == 0) {
                $scope.mallcategory.push(data[i]);
            }
        }
        console.log("formated categories");
        console.log($scope.mallcategory);
        $scope.mallcategory = partitionarray($scope.mallcategory, 2);
    };
    MyServices.mallcategories($stateParams.id).success(mallcategorysuccess);

    function partitionarray(myarray, number) {
        var arrlength = myarray.length;
        var newarray = [];
        var j = -1;
        for (var i = 0; i < arrlength; i++) {
            if (i % number == 0) {
                j++;
                newarray[j] = [];
            }
            newarray[j].push(myarray[i]);
        }
        return newarray;
    };

    // Share
    $scope.share = function () {
        console.log('Share');
        window.plugins.socialsharing.share('Checkout ' + $scope.mall.name + ' on 91streets, Download 91streets: https://play.google.com/store/apps/details?id=com.nintyonestreets.nintyonestreets');
    };

})


.controller('BrandStoreCtrl', function ($scope, $stateParams, MyServices, $ionicModal, $ionicSlideBoxDelegate) {
    $scope.demo = "demo";
    $scope.brands = [];
    // ip function


    //Get brands by category API
    var brnadsuccess = function (data, status) {

        $scope.brands = data;
        for (var i = 0; i < data.length; i++) {
            if (data[i].latitude != null) {
                $scope.brands[i].dist = (getDistance(lat, long, data[i].latitude, data[i].longitude)).toFixed(1);
                console.log($scope.brands[i].dist);
            } else {
                $scope.brands[i].dist = 0;
            }
        }
        console.log($scope.brands);
    }

    function showPosition2(position) {
        var latlon = position.coords.latitude + "," + position.coords.longitude;
        console.log("Positions:.........");
        console.log(position.coords);
        $scope.coords = position.coords;
        lat = position.coords.latitude;
        long = position.coords.longitude;
        MyServices.getallstoresbybrandid($stateParams.id).success(brnadsuccess);
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition2, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }


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