var lat = 0;
var long = 0;
var applink = 'http://www.91streets.com/download/';
angular.module('starter.controllers', ['ionic', 'myservices', 'ngCordova'])

.controller('IntroCtrl', function($scope, $stateParams, $ionicModal, $timeout, MyServices, $ionicSlideBoxDelegate, $ionicPopover, $location) {
    sendtoga("Intro Page");
    $scope.next = function() {
        $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function() {
        $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
    };

})

.controller('HomeCtrl', function($scope, $stateParams, $ionicModal, $timeout, MyServices, $ionicSlideBoxDelegate, $ionicPopover, $location, $ionicLoading, $ionicPopup) {

    sendtoga("Home Page");

    //no location
    
    
    //No Location
    $scope.locationPopup = function() {
        $scope.data = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<div class="text-center"><h1 class="ion-location assertive"></h1><p>We dont have access to location services on your device. <br> Please go to settings and enable location services to get accurate results.</p>',
            title: 'Oops!',
            scope: $scope,

        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 6000);
    };

    //Loader
    $ionicLoading.show({
        template: 'Loading...',
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 200
    });

    //INTRO MODAL
    $ionicModal.fromTemplateUrl('templates/intro.html', {
        id: '2',
        scope: $scope
    }).then(function(modal) {
        $scope.oModal2 = modal;

    });


    //Home Intro
    $scope.startApp = function() {
        $scope.oModal2.hide();
    };

    $scope.showIntro = function() {
        $scope.oModal2.show();
    };
    //opensearch

    $scope.opensearch = function() {
        console.log("search");
        $location.url("tab/search");
    }

    //opensearch
    var bannersuccess = function(data, status) {
        console.log(data);
        $scope.slider = data;
        $ionicSlideBoxDelegate.update();
        $ionicLoading.hide(); 
    };
    MyServices.getbanner().success(bannersuccess);

    //end slide fron api....

    $scope.loginData = {};
    $scope.loginlogouttext = "Log Out";
    $scope.shoppingtext = false;
    $scope.userdata = user = $.jStorage.get("user");
    console.log($scope.userdata);
    $scope.userpro = [];

    var getshoppingbag1 = function(data, status) {
        if (data == 1) {
            $scope.shoppingtext = false;
        } else {
            $scope.shoppingtext = true;
        }
    };
    var before = function(data, status) {
        console.log(data);
        $scope.userpro = data;
    };
    //update profile
    var userupdated = function(data, status) {
        console.log(data);
    };
    $scope.updatepro = function(userpro) {
        MyServices.updateuserpro(userpro, $scope.userdata.id).success(userupdated);
    }

    //update profile
    if ($scope.userdata) {
        MyServices.isshopping($scope.userdata.id).success(getshoppingbag1);
        MyServices.findoneuser($scope.userdata.id).success(before);
    }
    $scope.gotoshoppingbag = function() {
        $location.url("tab/shoppingbag");
    }
    console.log("my data");
    console.log($scope.userdata);
    if ($scope.userdata) {
        $scope.loginlogouttext = "Log Out";
    } else {
        $scope.loginlogouttext = "Please Login";
    }


    //Google Maps API Lat Long
    console.log("my lat long");
    console.log(lat);
    console.log(long);
    var getcategorysuccess = function(data, status) {
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

    $scope.shoppingip = function() {
        console.log(lat);
    };

    MyServices.getcategory().success(getcategorysuccess);

    // Create the login modal
    $scope.checkButton = function(check) {
        var page = 'login';
        if (check == 'register') {
            page = "register";
            $scope.oModal1.hide();
        } else {
            page = "login";

        }
        $ionicModal.fromTemplateUrl('templates/' + page + '.html', {
            id: '1',
            scope: $scope
        }).then(function(modal) {
            $scope.oModal1 = modal;
            $scope.oModal1.show();

        });
    }

    $scope.userdata = user = $.jStorage.get("user");

    console.log($scope.userdata);

    var getcityname = function(data, status) {
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
    var onregistersuccess = function(data, status) {
        console.log(data);
        $scope.loginData.email = data.email;
        $scope.loginData.password = data.passsword;
        console.log(data);
        $scope.checkButton('login');
        $scope.oModal1.hide();

    }
    $scope.submitRegister = function(data) {
        MyServices.appsignup(data.name, data.lastname, data.email, data.password, data.city).success(onregistersuccess)
    };

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.oModal1.hide();
    };
    // Open the login modal
    $scope.showlogin = function() {
        $scope.oModal1.show();
    };

    // Slider Home Tab
    $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next();
    };
    $scope.prevSlide = function() {
        $ionicSlideBoxDelegate.previous();
    };

    var loginsuccess = function(data, status) {
        if (data != "false") {
            $scope.userdata = data;
            MyServices.setuser($scope.userdata);
            $scope.closeLogin();
        };

    };

    $scope.doLogin = function(userdata) {
        var useremail = userdata.email;
        var password = userdata.password;
        MyServices.loginuser(useremail, password).success(loginsuccess);
        $scope.showIntro();
    };

    //Logout function
    $scope.logout = function() {
        $.jStorage.flush();
        $scope.userdata = {};
        MyServices.setuser($scope.userdata);
        $scope.loginlogouttext = "Login";
        $.jStorage.deleteKey("user");
    };


    // Popover Share
    $ionicPopover.fromTemplateUrl('templates/share-popover.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });
    $scope.openPopover = function($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function() {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });
    // Execute action on hide popover
    $scope.$on('popover.hidden', function() {
        // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function() {
        // Execute action
    });


    //    get all city
    var getcity = function(data, status) {
        console.log(data);
        $scope.cities = data;
    };
    MyServices.viewcity().success(getcity);
    //Display Main categories




    // Share
    $scope.share = function() {
        console.log('Share');
        sendtoga("App shared");
        window.plugins.socialsharing.share('Download 91streets - Shopping Companion: ' +applink);
    };

})

.controller('FavoritesStoreCtrl', function($scope, MyServices, $ionicModal, $timeout, $location) {

    $scope.user = MyServices.getuser();
    $scope.brands = [];
    console.log($scope.user);
    $scope.addlike = 0;
    $scope.checkval = 1;
    $scope.searchdata = "";
    $scope.showSearch = false;
    $scope.searchinput = {
        datasearch: ""
    };

    $scope.gotofavorites = function() {
        console.log("gotofavoriteslist clicked");
        $location.url("tab/favorites");
    }
    var getsearch = 0;
    var favoritelisting = function(data, status) {
        //        getsearch++;
        //        if ($scope.searchinput.datasearch == "" || checksearch == getsearch) {
        console.log(data);
        var inibrandlength = $scope.brands.length;
        console.log(inibrandlength);
        //        $scope.brands =;
        for (var i = 0; i < data.length; i++) {
            $scope.brands.push(data[i]);
        }

        sendtoga("FavoriteStore");
        for (var i = 0; i < data.length; i++) {
            if (data[i].logo == "") {
                $scope.brands[i + inibrandlength].logo = "logo.png";
            }

            $scope.brands[i + inibrandlength].mylike = data[i].like.length;
            for (var j = 0; j < data[i].like.length; j++) {
                if (data[i].like[j].user == $scope.user.id) {
                    $scope.brands[i + inibrandlength].userlike = 1;
                } else {
                    $scope.brands[i + inibrandlength].userlike = 0;
                }
            }
        }
        console.log("Like");
        console.log($scope.brands);

        $scope.$broadcast('scroll.infiniteScrollComplete');
        //        }
    };
    MyServices.favoritebrands(0).success(favoritelisting);

    $scope.likeclass = "liked";
    $scope.nolikeclass = "";
    var ilike = function(data, status) {
        console.log(data);
    };


    $scope.like = function(brand) {
        //        console.log(brand);

        if (brand.userlike == 0) {
            brand.userlike = 1;
            brand.mylike++;
            MyServices.like($scope.user.id, brand.id, brand.userlike).success(ilike);
        } else {
            brand.userlike = 0;
            brand.mylike--;
            MyServices.like($scope.user.id, brand.id, brand.userlike).success(ilike);
        }
        console.log(brand.userlike);
        //$scope.$apply();
    }

    var successfavorite = function(data, status) {
        console.log(data);
    };
    //    var checksearch = 0;
    $scope.doSearch = function() {
        //console.log(searchdata);
        //        checksearch++;
        $scope.checkval = 2;
        $scope.searchdata = $scope.searchinput.datasearch;
        console.log($scope.searchinput.datasearch);
        $scope.brands = [];
        MyServices.favoritesearch($scope.searchinput.datasearch).success(favoritelisting);
    }
    $scope.showsearch = function() {
        if ($scope.showSearch == false) {
            $scope.showSearch = true;
        } else {
            $scope.showSearch = false;
            $scope.checkval = 1;
            $scope.brands = [];
            $scope.searchdata = "";
            MyServices.favoritebrands(0).success(favoritelisting);
        }
    }
    $scope.clearSearch = function() {
        console.log("clearsearch");
    }

    //load more

    var lastlength = 0;
    $scope.loadMore = function() {
        console.log("Load Called");
        var totallength = $scope.brands.length;
        if (lastlength != totallength) {
            lastlength = totallength;
            if ($scope.checkval == 1) {
                MyServices.favoritebrands(totallength).success(favoritelisting);
            }
            //            if($scope.checkval==2)
            //            {
            //                MyServices.favoritesearch($scope.searchdata).success(favoritelisting);
            //            }

        }


    };


})
    .controller('NotificationCtrl', function($scope, MyServices, $ionicModal, $timeout, $location, $ionicLoading) {
        $scope.userdata = user = $.jStorage.get("user");
        console.log($scope.userdata);
        sendtoga("Notification");
        var getnotification = function(data, status) {
            console.log(data);
            $scope.notification = data;
            $ionicLoading.hide();
        };
        MyServices.notification($scope.userdata.id).success(getnotification);

        //Loader
        $ionicLoading.show({
            template: 'Loading...',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200
        });
    })

.controller('SettingCtrl', function($scope) {})
    .controller('Search', function($scope, MyServices, $stateParams, $ionicModal, $timeout, $location) {

        $scope.myorder = 'dist';
        $scope.search = 1;
        $scope.bybrandmall = 1;
        $scope.myorderorder = false;

        $scope.user = MyServices.getuser();
        if ($scope.user == null) {
            $scope.ucity = 0;
        }
        console.log($scope.user);
        $scope.brandmalldiv = false;

        var allmalls = function(data, status) {
            console.log(data);
            $scope.malls = data;
            for (var i = 0; i < data.length; i++) {
                if (data[i].latitude == null & data[i].longitude == null) {
                    $scope.malls[i].dist = 0;
                } else {
                    $scope.malls[i].dist = (getDistance(data[i].latitude, data[i].longitude, lat, long)).toFixed(1);
                }
                if ($scope.malls[i].logo == "" || $scope.malls[i].logo == null) {
                    $scope.malls[i].logo = "logo.png";
                }

            }
        };


        sendtoga("SearchPage");

        var brnadsuccess = function(data, status) {


            console.log(data);
            $scope.brands = data;


            for (var i = 0; i < data.length; i++) {
                if ($scope.brands[i].logo == "" || $scope.brands[i].logo == null) {
                    $scope.brands[i].logo = "logo.png";
                }

            }

        };

        $scope.brandmall = function(search) {

            $scope.bybrandmall = search;


        }

        $scope.doSearch = function(searchdata) {
            if ($scope.bybrandmall == 1) {
                $scope.brandmalldiv = false;
                MyServices.getallbrandssearch(searchdata).success(brnadsuccess);
            } else {
                $scope.brandmalldiv = true;
                MyServices.searchbymall($scope.ucity, searchdata, 0, lat, long).success(allmalls);
            }
        }

        //get lat long



    })

.controller('InNotificationCtrl', function($scope, MyServices, $stateParams, $ionicModal, $timeout, $location) {


    $scope.notifications = [];
    //    start get user data

    $scope.userdata = user = $.jStorage.get("user");
    if ($scope.userdata) {
        $scope.ucity = $scope.userdata.city;
    } else {
        $scope.ucity = 0;
    }


    sendtoga("In Notification");
    //    end get user data
    var notificationbrand = function(data, status) {
        console.log(data);
        $scope.notifications = data;


        $scope.$broadcast('scroll.infiniteScrollComplete');

    };
    var pushnotificationbrand = function(data, status) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            $scope.notifications.push(data[i]);
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    MyServices.notificationbrandid($stateParams.id, $scope.ucity, lat, long, 0).success(notificationbrand);

    //start get location lat long

    //end get location lat long

    //    start reload function


    var lastlength = 0;
    $scope.loadMore = function() {
        var totallength = $scope.notifications.length;
        if (lastlength != totallength) {
            lastlength = totallength;

            MyServices.notificationbrandid($stateParams.id, $scope.ucity, lat, long, totallength).success(pushnotificationbrand);

        }


    };

    //    end  reload function

})

.controller('ShoppingCtrl', function($scope, MyServices, $ionicModal, $timeout, $location, $ionicLoading) {
    $scope.clothing = [];
    $scope.bigbagplan = [];
    var check1 = 0;


    //Loader
    $ionicLoading.show({
        template: 'Loading...',
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 200
    });

    var getshoppingbaggg = function(data, status) {
        $location.url('/tab/shopping');

    };


    sendtoga("Shopping Page");
    var getshoppingbagg = function(data, status) {

        console.log("inin big bag........");
        $ionicLoading.hide();
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


    function fillbagtocategory() {
        if (check1 == 1) {

            for (var i = 0; i < $scope.bigbag.length; i++) {
                for (var j = 0; j < $scope.categories.length; j++) {
                    for (var k = 0; k < $scope.categories[j].subcategory.length; k++) {
                        if ($scope.bigbag[i].id == $scope.categories[j].subcategory[k].id) {
                            $scope.categories[j].subcategory[k].type = true;
                            $scope.categories[j].font = "assertive";
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
    var clearsuccess = function(data, status) {
        for (var j = 0; j < $scope.categories.length; j++) {
            for (var k = 0; k < $scope.categories[j].subcategory.length; k++) {
                $scope.categories[j].subcategory[k].type = false;
                $scope.categories[j].font = "";
            }
        }
        // MyServices.getshoppingbag($scope.user.id).success(getshoppingbaggg);
    };
    $scope.clearshoppingbag = function() {
        console.log($scope.user.id);
        MyServices.clearshoppingbag($scope.user.id).success(clearsuccess);
    }
    var allcategory = function(data, status) {

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
    var subcategory = function(data, status) {
        $scope.clothing = data;
    };
    $scope.getsubcategory = function(id) {
        console.log("my id is");
        console.log(id);
        MyServices.getsubcategory(id).success(subcategory);
    };

    $scope.bigbag = [];
    $scope.addtobag = function(cloths) {

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

    var shoppingplansaved = function(data, status) {
        //        console.log(data);
        console.log("Shopping Plan Submited");
        $location.url("/tab/shoppingbag");
    };

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };



    $scope.submitplan = function() {
        $scope.bigbagplan.category = $scope.bigbag[0].id;
        for (var i = 1; i < $scope.bigbag.length; i++) {
            $scope.bigbagplan.category += "," + $scope.bigbag[i].id;
        }
        $scope.bigbagplan.user = $scope.user.id;
        MyServices.saveshoppingbag($scope.bigbagplan).success(shoppingplansaved);
    };

    $scope.showshoppingbag = function() {
        $location.url("/tab/shoppingbag");
    };


})

.controller('DiscountCtrl', function($scope, $cordovaGeolocation, $stateParams, $ionicPopup, MyServices, $ionicModal) {


    $scope.cat = [];
    $scope.catarray = [];
    $scope.checkval = 1;
    $scope.listing = [];
    $scope.searchdata = "";
    $scope.myorder = 0;
    $scope.msg = "";
    $scope.user = MyServices.getuser();
    if ($scope.user == null) {
        $scope.city = 0;
    } else {
        $scope.city = $scope.user.city;
    }
    // close modal
    $scope.closeModal = function() {

        $scope.oModal4.hide();
    };
    //    clear filter and sort

    $scope.clear = function() {
        $scope.checkval = 1;
        $scope.searchdata = "";
        $scope.myorder = 0;
        MyServices.getallstoresdiscount($scope.city, 0, lat, long, $scope.myorder).success(getdiscount);
    };

    var allmaincategory = function(data, status) {
        console.log(data);
        $scope.allcat = data;
    };
    MyServices.getcategory().success(allmaincategory);

    //filter
    $scope.filter = function(cat) {

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
    $scope.changesort = function(order) {
        $scope.myorder = order;
        if ($scope.checkval == 1) {
            MyServices.getallstoresdiscount($scope.city, 0, lat, long, $scope.myorder).success(getdiscount);
        } else if ($scope.checkval == 2) {
            MyServices.getcatarraystoreoffer($scope.catarray, $scope.city, 0, lat, long, $scope.myorder).success(getdiscount);
        } else {
            MyServices.discountsearch($scope.searchdata, $scope.city, 0, lat, long, $scope.myorder).success(getdiscount);
        }
    };
    //Search
    var onsearchsuccess = function(data, status) {
        console.log(data);
        $scope.listing = {};
        $scope.listing = data;
        for (var i = 0; i < data.length; i++) {
            $scope.listing[i].image = data[i].brandlogo;
            $scope.listing[i].id = data[i].storeid;
        }
    }
    $scope.doSearch = function(data) {
        $scope.searchdata = data;
        $scope.checkval = 3;
        MyServices.discountsearch($scope.searchdata, $scope.city, 0, lat, long, $scope.myorder).success(getdiscount);
    };

    $ionicModal.fromTemplateUrl('templates/discountsort.html', {
        id: '4',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal4 = modal;
    });
    $scope.showsortsort = function() {
        $scope.oModal4.show();
    };


    sendtoga("Discount Page");
    var getdiscount = function(data, status) {

        $scope.listing = "";
        $scope.listing = data;
        if ($scope.listing == "") {
            $scope.msg = "NO DATA FOUND";
        } else {
            $scope.msg = "";
        }


        for (var i = 0; i < data.length; i++) {
            if (data[i].logo == null) {
                $scope.listing[i].logo = "logo.png";
            }
            if (data[i].latitude == null & data[i].longitude == null) {
                $scope.listing[i].dist = 0;
            }
        };
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    var pushgetdiscount = function(data, status) {
        //$scope.listing = data;
        console.log("my data");
        for (var i = 0; i < data.length; i++) {
            $scope.listing.push(data[i]);
        }
        var mylength = data.lenght;
        for (var i = 0; i < mylength; i++) {
            if ($scope.listing[i].logo == null) {
                $scope.listing[i].logo = "logo.png";
            }
            if ($scope.listing[i].latitude == null & $scope.listing[i].longitude == null) {
                $scope.listing[i].dist = 0;
            }
        };
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };







    // loadmore discount
    $scope.dicountItem = [];
    var change = 10;
    var counter = 0;
    var scroll = 0;

    MyServices.getallstoresdiscount($scope.city, 0, lat, long, $scope.myorder).success(getdiscount);




    //Sort Modal
    $ionicModal.fromTemplateUrl('templates/allfilter.html', {
        id: '3',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal3 = modal;
    });
    $scope.showSort = function() {
        $scope.oModal3.show();
    };


    //    var catarraysuccess = function (data, status) {
    //        console.log(data);
    //        $scope.brands = data;
    //    };

    $scope.hideSort = function(dep) {
        console.log($scope.cat);
        $scope.catarray = $scope.cat[0].id;
        for (var i = 1; i < $scope.cat.length; i++) {
            $scope.catarray += "," + $scope.cat[i].id;
        }
        $scope.oModal3.hide();
        $scope.checkval = 2;
        MyServices.getcatarraystoreoffer($scope.catarray, $scope.city, 0, lat, long, $scope.myorder).success(getdiscount);
    };

    //load more

    var lastlength = 0;
    $scope.loadMore = function() {
        console.log("Load Called");
        var totallength = $scope.listing.length;
        if (lastlength != totallength) {
            lastlength = totallength;

            if ($scope.checkval == 1) {
                MyServices.getallstoresdiscount($scope.city, totallength, lat, long, $scope.myorder).success(pushgetdiscount);
            }
            if ($scope.checkval == 2) {
                MyServices.getcatarraystoreoffer($scope.catarray, $scope.city, totallength, lat, long, $scope.myorder).success(pushgetdiscount);
            }
            if ($scope.checkval == 3) {
                MyServices.discountsearch($scope.searchdata, $scope.city, totallength, lat, long, $scope.myorder).success(pushgetdiscount);
            }

        }


    };

})

.controller('ShoppingBagCtrl', function($scope, $cordovaGeolocation, $stateParams, $ionicPopup, MyServices, $ionicLoading) {


    $scope.checkval = 1;
    $scope.listing = [];
    var getshoppingbagg = function(data, status) {
        console.log(data);

        sendtoga("Shopping Bag Page");


        for (var i = 0; i < data.length; i++) {
            $scope.listing = data;
            $scope.listing[i].dist = (getDistance(data[i].latitude, data[i].longitude, lat, long)).toFixed(1);
            console.log($scope.listing[i].dist);
        }
        //        console.log($scope.listing);
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    var pushgetshoppingbagg = function(data, status) {
        console.log(data);

        console.log("before");
        console.log($scope.listing);
        for (var i = 0; i < data.length; i++) {
            $scope.listing.push(data[i]);
        }

        console.log("after");
        console.log($scope.listing);

        for (var i = 0; i < data.length; i++) {
            $scope.listing = data;
            $scope.listing[i].dist = (getDistance(data[i].latitude, data[i].longitude, lat, long)).toFixed(1);
            console.log($scope.listing[i].dist);
        }
        //        console.log($scope.listing);
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    $scope.user = MyServices.getuser();
    if ($scope.user == null) {

        $location.url('/home');

    } else {
        $scope.ucity = $scope.user.city;
        console.log($scope.user.city);
    }
    //        get lat long


    MyServices.getstorebycategories($scope.user.id, $scope.ucity, 0).success(getshoppingbagg);



    //load more

    var lastlength = 0;
    $scope.loadMore = function() {
        console.log("Load Called");
        var totallength = $scope.listing.length;
        console.log("totallength");
        console.log(totallength);
        console.log("lastlength");
        console.log(lastlength);
        if (lastlength != totallength) {
            console.log("im in.....................");
            lastlength = totallength;

            if ($scope.checkval == 1) {
                MyServices.getstorebycategories($scope.user.id, $scope.ucity, totallength).success(pushgetshoppingbagg);
            }

        }


    };

    $scope.doSearch = function(searchdata) {
        console.log(searchdata);
        MyServices.getstorebycategoriessearch($scope.user.id, $scope.ucity, searchdata).success(getshoppingbagg);
    }


})


.controller('StoreDetailCtrl', function($scope, $cordovaGeolocation, $stateParams, $ionicPopup, MyServices) {


    var onestore = function(data, status) {
        console.log(data);
        $scope.storedetails = {};
        $scope.storedetails = data;



        var addre = "";
        if (storedetails.address) {
            addre = storedetails.address;
        } else {
            addre = storedetails.storeaddress;

        }

        sendtoga('Store Detail Page - ' + data.brandname + ' - ' + addre);

        for (var i = 0; i < data.length; i++) {
            if (data[i].image == null) {
                $scope.storedetails[i].image = "logo.png";
            }
            $scope.storedetails[i].dist = (getDistance(data[i].latitude, data[i].longitude, lat, long)).toFixed(1);

        }
    };

    MyServices.getstorebyid($stateParams.id).success(onestore);

    // Share
    $scope.share = function() {
        console.log('Share');
        window.plugins.socialsharing.share('Checkout ' + $scope.storedetails.brandname + ' on 91streets, Download 91streets: ' +applink);
    }


})
    .controller('StoreListCtrl', function($scope, $cordovaGeolocation, $stateParams, $ionicPopup, MyServices, $ionicModal) {
        $scope.checkval = 1;
        //    1 : for getbrandsbycategory start with all by main category
        //    2 : for getstorebycategoryoffers all offers

        //        $scope.atoz=
        $scope.brands = [];


        sendtoga("StoreList");
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
        $scope.searchdata = "";
        $scope.atoz = true;
        //        $scope.myorder = 'dist';
        //        $scope.myorderorder = false;


        $scope.myorder = 0;

        $scope.changesort = function(order) {

            $scope.myorder = order;
            console.log(order);
            console.log($scope.checkval);
            if ($scope.checkval == 1) {
                MyServices.getbrandsbycategory(categoryId, $scope.ucity, 0, lat, long, $scope.myorder).success(onbrandbycategorysuccess);
            } else if ($scope.checkval == 2) {
                MyServices.getstorebycategoryoffers($stateParams.cid, $scope.ucity, 0, lat, long, $scope.myorder).success(getdiscount);
            } else if ($scope.checkval == 3) {
                MyServices.getcatarraystore($scope.catarray, $scope.ucity, 0, lat, long, $scope.myorder).success(onbrandbycategorysuccess);
            } else {
                MyServices.search($scope.searchdata, categoryId, $scope.ucity, 0, lat, long, $scope.myorder).success(onbrandbycategorysuccess);
            }
        };
        //show discount fucntion

        $scope.clear = function() {
            $scope.checkval = 1;
            $scope.myorder = 0;
            $scope.searchdata = "";
            MyServices.getbrandsbycategory(categoryId, $scope.ucity, 0, lat, long, $scope.myorder).success(onbrandbycategorysuccess);
        }

        var getdiscount = function(data, status) {

            $scope.brands = data;
            //            for (var i = 0; i < data.length; i++) {
            //                $scope.brands[i].dist = (getDistance(data[i].latitude, data[i].longitude, lat, long)).toFixed(1);
            //                console.log($scope.brands[i].dist);
            //            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            console.log($scope.brands);
        }

        $scope.showdiscount = function() {
            if ($scope.discountstatus == 0) {
                $scope.checkval = 2;
                MyServices.getstorebycategoryoffers($stateParams.cid, $scope.ucity, 0, lat, long, $scope.myorder).success(getdiscount);
                $scope.discountstatus = 1;
            } else {
                $scope.checkval = 1;
                $scope.myorder = 0;
                MyServices.getbrandsbycategory(categoryId, $scope.ucity, 0, lat, long, $scope.myorder).success(onbrandbycategorysuccess);
                $scope.discountstatus = 0;
            }

        }

        //Get brands by category API
        var onbrandbycategorysuccess = function(data, status) {
            console.log("my data");
            console.log(data);
            $scope.brands = data;
            //            for (var i = 0; i < data.length; i++) {
            ////                $scope.brands[i].dist = ($scope.brands[i].dist).toFixed(1);
            //                            console.log($scope.brands[i].dist.toFixed(1));
            //            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            //$scope.loadMore();
        };
        var pushcategorysuccess = function(data, status) {
            console.log("my data");
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                $scope.brands.push(data[i]);
            }
            //            for (var i = 0; i < $scope.brands.length; i++) {
            //                $scope.brands[i].dist = (getDistance($scope.brands[i].latitude, $scope.brands[i].longitude, lat, long)).toFixed(1);
            //            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        MyServices.getbrandsbycategory(categoryId, $scope.ucity, 0, lat, long, $scope.myorder).success(onbrandbycategorysuccess);



        //    //ionic load more
        $scope.productItem = [];
        var change = 10;
        var counter = 0;
        //    $scope.brands = [];
        var lastlength = 0;
        $scope.loadMore = function() {
            console.log("Load Called");
            var totallength = $scope.brands.length;
            if (lastlength != totallength) {
                lastlength = totallength;

                if ($scope.checkval == 1) {
                    MyServices.getbrandsbycategory(categoryId, $scope.ucity, totallength, lat, long, $scope.myorder).success(pushcategorysuccess);
                }
                if ($scope.checkval == 2) {
                    MyServices.getstorebycategoryoffers($stateParams.cid, $scope.ucity, totallength, lat, long, $scope.myorder).success(pushcategorysuccess);
                }
                if ($scope.checkval == 3) {
                    MyServices.getcatarraystore($scope.catarray, $scope.ucity, totallength, lat, long, $scope.myorder).success(pushcategorysuccess);
                }
                if ($scope.checkval == 4) {
                    MyServices.search($scope.searchdata, categoryId, $scope.ucity, totallength, lat, long, $scope.myorder).success(pushcategorysuccess);
                }

            }


        };

        //get sub category
        var subcategorysuccess = function(data, status) {
            console.log(data);
            $scope.subcat = data;
        };
        MyServices.getsubcategory(categoryId).success(subcategorysuccess);
        //filter
        $scope.filter = function(cat) {

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
        }).then(function(modal) {
            $scope.oModal1 = modal;
        });
        $ionicModal.fromTemplateUrl('templates/othersort.html', {
            id: '2',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.oModal2 = modal;
        });
        $scope.showSort = function() {
            $scope.oModal1.show();
        };
        $scope.showsortsort = function() {
            $scope.oModal2.show();
        };


        //    var catarraysuccess = function (data, status) {
        //        console.log(data);
        //        $scope.brands = data;
        //    };

        $scope.hideSort = function(dep) {
            console.log($scope.cat);
            if ($scope.cat != "") {
                $scope.catarray = $scope.cat[0].id;
                for (var i = 1; i < $scope.cat.length; i++) {
                    $scope.catarray += "," + $scope.cat[i].id;
                }

                $scope.checkval = 3;
                MyServices.getcatarraystore($scope.catarray, $scope.ucity, 0, lat, long, $scope.myorder).success(onbrandbycategorysuccess);
            }
            $scope.oModal1.hide();
        };


        //Alert
        $scope.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Unable to find location',
                template: 'Please turn on your GPS'
            });
        };

        //Location
        $cordovaGeolocation.getCurrentPosition()
            .then(function(position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                $scope.location = position.coords;

            }, function(err) {
                $scope.showAlert();
            });


        //Search
        var onsearchsuccess = function(data, status) {
            console.log(data);
            $scope.brands = data;
        };

        $scope.doSearch = function(data) {

            $scope.checkval = 4;
            $scope.searchdata = data;
            MyServices.search($scope.searchdata, categoryId, $scope.ucity, 0, lat, long, $scope.myorder).success(onbrandbycategorysuccess);
        };

        $scope.clearSearch = function() {
            console.log("Click");
            $scope.datasearch = '';
        };

        // close modal
        $scope.closeModal = function() {
            $scope.oModal2.hide();
        };
    })

.controller('StorePageCtrl', function($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {

    $scope.likediv = true;
    $scope.user = {};
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
    } else {
        $scope.userid = $scope.user.id;
    }
    var brandId = $stateParams.bid;
    var ongetbrandsuccess = function(data, status) {
        console.log(data);
        $scope.branddetails = data.store;
        if ($scope.branddetails.brandlogo == "" || !$scope.branddetails.brandlogo) {
            $scope.branddetails.brandlogo = "logo.png";
        }
        $scope.newarrivals = data.newin;

        var addre = "";
        if (data.store.address) {
            addre = data.store.address;
        } else {
            addre = data.store.storeaddress;

        }

        sendtoga('Store Page Loaded - ' + data.store.brandname + ' - ' + addre);

        $scope.initEvent = function() {






        }

        $scope.reviews = data.review;
        $scope.offers = data.offers;

        if (data.like == 2) {
            $scope.likediv = false;
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
        $scope.like = function() {

        }

        $scope.like = function() {

            if ($scope.userid != 0) {
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
            } else {
                $location.url('/home');
            }

        }
    }

    MyServices.getbranddetails(brandId, $scope.userid).success(ongetbrandsuccess);

    // MyServices.mallcategorystore($stateParams.id, $stateParams.mid, 0, lat, long, $scope.myorder).success(mallpagesuccess);



    //Send to Browers
    $scope.sendtowebsite = function(website) {
        console.log(website);
        window.open('http://' + website, '_blank');
    }


    $scope.sendtomap = function(lati, longi) {
        console.log('https://www.google.co.in/maps/dir/' + lat + ',' + long + '/' + lati + ',' + longi + '/@' + lat + ',' + long + ',17z');
        window.open('https://www.google.co.in/maps/dir/' + lat + ',' + long + '/' + lati + ',' + longi + '/@' + lat + ',' + long + ',17z', '_blank');

    }

    //like API
    var likesuccess = function(data, status) {
        console.log(data + 'Liked');
    };
    $scope.likeapi = function(userid, brandid, like) {
        MyServices.like(userid, brandid, like).success(likesuccess);
    }

    //rating API
    var ratesuccess = function(data, status) {

    };
    $scope.submitRate = function(userid, storeid, rating, review) {
        MyServices.rating(userid, storeid, rating, review).success(ratesuccess);
    }

    // Popups for favorites
    $scope.addfavPopup = function() {
        $scope.data = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<div class="text-center"><h1 class="ion-android-checkmark balanced"></h1><p>' + $scope.branddetails.brandname + ' added to favorites!</p>',
            title: 'Added to favorites!',
            scope: $scope,

        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 1500);
    };

    $scope.remfavPopup = function() {
        $scope.data = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<div class="text-center"><h1 class="ion-android-close assertive"></h1><p>' + $scope.branddetails.brandname + ' removed from favorites!</p>',
            title: 'Removed from favorites!',
            scope: $scope,

        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 1500);
    };

    // Share
    $scope.share = function() {
        console.log('Share');
        window.plugins.socialsharing.share('Checkout ' + $scope.branddetails.brandname + ' on 91streets, Download 91streets: ' +applink);
    }

    // Share img
    $scope.shareImg = function(image) {
        console.log(imagepath + image);
        console.log(image);
        console.log(imagepath);
        window.plugins.socialsharing.share('Checkout ' + $scope.branddetails.brandname + ' on 91streets, Download 91streets: ' +applink, null, imagepath + image);
    }
    $scope.user = MyServices.getuser();
    //Rating
    $scope.rate = 0;
    $scope.max = 5;
    $scope.readonly = true;

    $scope.showPopup = function() {
        if ($scope.userid != 0) {

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
                    onTap: function(e) {
                        $scope.submitRate($scope.userid, $scope.branddetails.id, $scope.data.newrate, $scope.data.newreview);
                        console.log($scope.userid, $scope.branddetails.id, $scope.data.newrate, $scope.data.newreview);
                    }
                }]

            });
        } else {
            $location.url('/home');
        }

    };

    //load more review
    $scope.seemore = "View All";
    var reviewlosdsuccess = function(data, status) {
        $scope.reviews = data;
    };
    $scope.loadmorereview = function() {
        $scope.seemore = "";
        MyServices.reviewbystoreid($scope.branddetails.id).success(reviewlosdsuccess);
    }

})

.controller('BrandListCtrl', function($scope, $stateParams, MyServices, $ionicModal, $ionicSlideBoxDelegate) {
    $scope.demo = "demo";


    sendtoga("Brand List Page");



    var brnadsuccess = function(data, status) {

        console.log(data);
        $scope.brands = data;

    };
    MyServices.getallbrands().success(brnadsuccess);
})

.controller('FavoritesCtrl', function($scope, $stateParams, MyServices, $ionicModal, $ionicSlideBoxDelegate, $location, $ionicLoading) {

    //Loader
    $ionicLoading.show({
        template: 'Loading...',
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 200
    });

    sendtoga("Favorites Page");

    $scope.user = {};
    $scope.user = MyServices.getuser();
    console.log("My information");
    console.log($scope.user);
    $scope.favorites = {};
    var userlikes = function(data, status) {
        //        console.log(data);
        $ionicLoading.hide();
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


    $scope.gotofavoriteslist = function() {
        console.log("gotofavoriteslist clicked");
        $location.url("tab/favoritesstore");
    }

})

.controller('MallPageListCtrl', function($scope, $stateParams, MyServices, $ionicPopup, $ionicModal, $ionicSlideBoxDelegate) {
    console.log($stateParams.mid);
    $scope.cat = [];
    $scope.malllist = [];
    $scope.checkval = 1;
    $scope.searchdata = "";



    sendtoga("Mall List Page");


    $scope.myorder = 0;
    //    $scope.myorderorder = false;;
    $scope.changesort = function(order) {

        console.log(order);
        $scope.myorder = order;

        if ($scope.checkval == 1) {
            MyServices.mallcategorystore($stateParams.id, $stateParams.mid, 0, lat, long, $scope.myorder).success(mallpagesuccess);
        }
        if ($scope.checkval == 2) {
            MyServices.mallcategorystorecat($scope.categoryarray, $stateParams.mid, 0, lat, long, $scope.myorder).success(mallpagesuccess);
        }
        if ($scope.checkval == 3) {
            MyServices.mallpagesearch($scope.searchdata, $stateParams.id, $stateParams.mid, 0, lat, long, $scope.myorder).success(mallpagesuccess);
        }
    };

    //    get all search

    $scope.doSearch = function(searchdata) {


        $scope.checkval = 3;
        $scope.searchdata = searchdata;
        MyServices.mallpagesearch($scope.searchdata, $stateParams.id, $stateParams.mid, 0, lat, long, $scope.myorder).success(mallpagesuccess);

    }

    //    get all search

    //    get user
    $scope.user = MyServices.getuser();
    console.log($scope.user);
    if ($scope.user == null) {
        $scope.usercity = 0;
    } else {
        $scope.usercity = $scope.user.city;
    }

    //get sub category
    var subcategorysuccess = function(data, status) {
        console.log(data);
        $scope.subcat = data;
    };
    MyServices.getsubcategory($stateParams.id).success(subcategorysuccess);
    //filter
    $scope.filter = function(cat) {

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


    //Sort Modal
    $ionicModal.fromTemplateUrl('templates/sort.html', {
        id: '1',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal1 = modal;
    });
    $scope.showSort = function() {
        $scope.oModal1.show();
    };
    //Sort Modal
    $ionicModal.fromTemplateUrl('templates/discountsort.html', {
        id: '4',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal4 = modal;
    });
    $scope.showsortsort = function() {
        $scope.oModal4.show();
    };

    // close modal
    $scope.closeModal = function() {
        $scope.oModal4.hide();
    };
    //    var catarraysuccess = function (data, status) {
    //        console.log(data);
    //        $scope.malllist = data;
    //        for (var i = 0; i < data.length; i++) {
    //            if (data[i].latitude != null) {
    //                $scope.malllist[i].dist = (getDistance(lat, long, data[i].latitude, data[i].longitude)).toFixed(1);
    //            } else {
    //                $scope.malllist[i].dist = 0;
    //            }
    //        }
    //    };

    $scope.hideSort = function() {

        console.log($scope.cat);
        $scope.categoryarray = $scope.cat[0].id;
        for (var i = 1; i < $scope.cat.length; i++) {
            $scope.categoryarray += "," + $scope.cat[i].id;
        }
        console.log($scope.categoryarray);
        $scope.oModal1.hide();
        console.log($scope.usercity);
        $scope.checkval = 2;
        MyServices.mallcategorystorecat($scope.categoryarray, $stateParams.mid, 0, lat, long, $scope.myorder).success(mallpagesuccess);
    };

    var mallpagesuccess = function(data, status) {
        //        $scope.checkval = 1;
        console.log(data);
        $scope.malllist = data;
        for (var i = 0; i < data.length; i++) {
            if (data[i].latitude == null) {
                $scope.malllist[i].dist = 0;
            }
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };


    MyServices.mallcategorystore($stateParams.id, $stateParams.mid, 0, lat, long, $scope.myorder).success(mallpagesuccess);



    //Mall
    var pushmallpagesuccess = function(data, status) {
        for (var i = 0; i < data.length; i++) {
            $scope.malllist.push(data[i]);
        }
        for (var i = 0; i < $scope.malllist.length; i++) {
            if ($scope.malllist[i].latitude == null) {
                $scope.malllist[i].dist = 0;
            }
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
    var lastlength = 0;
    $scope.loadMore = function() {
        var totallength = $scope.malllist.length;
        if (lastlength != totallength) {
            lastlength = totallength;
            if ($scope.checkval == 1) {
                MyServices.mallcategorystore($stateParams.id, $stateParams.mid, totallength, lat, long, $scope.myorder).success(pushmallpagesuccess);

            }
            if ($scope.checkval == 2) {
                MyServices.mallcategorystorecat($scope.categoryarray, $stateParams.mid, totallength, lat, long, $scope.myorder).success(pushmallpagesuccess);
            }
            if ($scope.checkval == 3) {
                MyServices.mallpagesearch($scope.searchdata, $stateParams.id, $stateParams.mid, totallength, lat, long, $scope.myorder).success(pushmallpagesuccess);
            }

        }
        //        $scope.$broadcast('scroll.infiniteScrollComplete');
    };



    $scope.clear = function() {
        $scope.checkval = 1;
        $scope.myorder = 0;
        $scope.searchdata = "";
        MyServices.mallcategorystore($stateParams.id, $stateParams.mid, 0, lat, long, $scope.myorder).success(mallpagesuccess);
    }
})

.controller('MallistCtrl', function($scope, $stateParams, MyServices, $ionicModal, $ionicSlideBoxDelegate) {
    $scope.demo = "demo";
    $scope.malls = [];
    $scope.search = false;
    $scope.checkval = 1;
    var mallsuccess = function(data, status) {
        $scope.search = false;
        scroll = 1;
        console.log(data);

        //        push all data same function


        for (var i = 0; i < data.length; i++) {
            $scope.malls.push(data[i]);
            //            
            //            //            $scope.malls[i].link="#/tab/malllist/mallpage/"+data.id;
            //            if (data[i].latitude != null) {
            //                $scope.malls[i].dist = (getDistance(lat, long, data[i].latitude, data[i].longitude)).toFixed(1);
            //            } else {
            //                $scope.malls[i].dist = 0;
            //            }
            //            if (data[i].logo == "") {
            //                $scope.malls[i].logo = "logo.png";
            //            }
        }
        for (var i = 0; i < data.length; i++) {

            //            $scope.malls[i].link="#/tab/malllist/mallpage/"+data.id;
            if (data[i].latitude == null) {
                $scope.malls[i].dist = 0;
            }
            if (data[i].logo == "") {
                $scope.malls[i].logo = "logo.png";
            }
        }

        $scope.$broadcast('scroll.infiniteScrollComplete');

    };

    sendtoga("Mall List Page");

    //Search
    var mallsuccess1 = function(data, status) {

        $scope.malls = data;
        for (var i = 0; i < data.length; i++) {

            //            $scope.malls[i].link="#/tab/malllist/mallpage/"+data.id;
            if (data[i].latitude == null) {
                $scope.malls[i].dist = 0;
            }
            if (data[i].logo == "") {
                $scope.malls[i].logo = "logo.png";
            }
        }


        $scope.$broadcast('scroll.infiniteScrollComplete');
    }
    $scope.doSearch = function(data) {

        $scope.checkval = 2;
        $scope.searchdata = data;
        $scope.malls = "";
        MyServices.searchbymall($scope.usercity, $scope.searchdata, 0, lat, long).success(mallsuccess1);
    };


    $scope.user = MyServices.getuser();
    console.log($scope.user);
    if ($scope.user == null) {
        $scope.usercity = 0;
    } else {
        $scope.usercity = $scope.user.city;
    }


    //ionic load more
    $scope.mallItem = [];
    var change = 10;
    var counter = 0;
    var scroll = 0;

    var lastlength = 0;
    $scope.loadMore = function() {
        console.log("Load Called");
        var totallength = $scope.malls.length;
        if (lastlength != totallength) {
            lastlength = totallength;
            if ($scope.checkval == 1) {
                MyServices.getallmalls($scope.usercity, totallength, lat, long).success(mallsuccess);
            }
            if ($scope.checkval == 2) {
                MyServices.searchbymall($scope.usercity, $scope.searchdata, totallength, lat, long).success(mallsuccess);
            }

        }

    };
    //    clear sech

    $scope.clearSearch = function() {

        console.log("clicked");
        $scope.showSearch = !$scope.showSearch;
    }

    MyServices.getallmalls($scope.usercity, 0, lat, long).success(mallsuccess1);
    //start user is not logged in get city from lat long


    $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyDqN3t8_Nb04MF7jTufq-bkEHogZxyeUHY", {}, function(data) {
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
    //    clear sech
    // malls api




})


.controller('PageOffersCtrl', function($scope, $stateParams, MyServices, $ionicModal, $ionicSlideBoxDelegate) {



    sendtoga("Page Offers");

    var successoffers = function(data, status) {
        console.log(data);
        $scope.offers = {};
        $scope.offers = data;
        for (var i = 0; i < data.length; i++) {
            if (data[i].image == null) {
                $scope.offers[i].image = "logo.png";
            }
        }
    };
    MyServices.mallalloffers($stateParams.id).success(successoffers);

    // Share
    $scope.share = function(name, header) {
        window.plugins.socialsharing.share('Checkout ' + name + ', ' + header + ' on 91streets, Download 91streets: ' +applink);
    };

})


.controller('MallPageCtrl', function($scope, $stateParams, MyServices, $ionicModal, $ionicSlideBoxDelegate) {
    $scope.demo = "demo";
    console.log("mall id");
    console.log($stateParams.id);
    $scope.mallid = $stateParams.id;
    $scope.mall = [];
    $scope.mallcategory = [];
    var successoffers = function(data, status) {
        console.log(data);
        $scope.offers = data;
    };
    MyServices.malloffers($stateParams.id, 2).success(successoffers)
    var mallsuccess = function(data, status) {
        console.log(data.mall);
        $scope.mall = data.mall;


        if (data.mall.logo == "") {
            $scope.mall.logo = "logo.png";
        }


        sendtoga('Mall Page - ' + data.mall.name);


    };
    MyServices.beforeeditmall($stateParams.id).success(mallsuccess);



    var mallcategorysuccess = function(data, status) {
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
    $scope.share = function() {
        console.log('Share');
        window.plugins.socialsharing.share('Checkout ' + $scope.mall.name + ' on 91streets, Download 91streets: ' +applink);
    };


    //MyServices.getallstoresbybrandid($stateParams.id).success(mallsuccess);
    //map api


    $scope.sendtowebsite = function(website) {
        console.log(website);
        window.open('http://' + website, '_blank');
    }

    $scope.sendtomap = function(lati, longi) {
        console.log(lati);
        console.log(longi);
        window.open('https://www.google.co.in/maps/dir/' + lat + ',' + long + '/' + lati + ',' + longi + '/@' + lat + ',' + long + ',17z', '_blank');
    }


})


.controller('BrandStoreCtrl', function($scope, $stateParams, MyServices, $ionicModal, $ionicSlideBoxDelegate) {
    $scope.demo = "demo";
    $scope.brands = [];



    sendtoga("BrandStore");



    //Get brands by category API
    var brnadsuccess = function(data, status) {

        $scope.brands = data;
        for (var i = 0; i < data.length; i++) {
            //            $scope.brands[i].logo = "logo.png";
            if ($scope.brands[i].logo == "" || !$scope.brands) {
                $scope.brands[i].logo = "logo.png";
            }
            if (data[i].latitude != null) {
                $scope.brands[i].dist = (getDistance(lat, long, data[i].latitude, data[i].longitude)).toFixed(1);
                console.log($scope.brands[i].dist);
            } else {
                $scope.brands[i].dist = 0;
            }


        }
        console.log($scope.brands);
    }
    MyServices.getallstoresbybrandid($stateParams.id).success(brnadsuccess);

})


.controller('PhotoSliderCtrl', function($scope, $stateParams, MyServices, $ionicModal, $ionicSlideBoxDelegate) {
    $ionicModal.fromTemplateUrl('templates/image-slider.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });



    sendtoga("PhotoSlider");
    $scope.openModal = function(index2) {

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

    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });
    $scope.$on('modal.shown', function() {
        console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
        $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function() {
        $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
    };

})

;