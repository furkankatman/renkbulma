/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * dolar 8.52 tarih 06/11/2020 buraya dikkat
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener('paused', this.onDevicePaused.bind(this), false);
        document.addEventListener('resumed', this.onDeviceResumed.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        var app = angular.module("renkbulmaApp", ['ngMaterial', 'ngSanitize', 'ngLocale', 'LocalStorageModule', 'ui.router', 'angular.filter']);

        app.controller("MainController", function ($scope) {
            setTimeout(function () {
                if (AdMob) {
                    if (/(android)/i.test(navigator.userAgent)) { // for android & amazon-fireos
                        admobid = {
                            banner: 'ca-app-pub-6629294346381579/2504382443', // or DFP format "/6253334/dfp_example_ad"
                            interstitial: ''
                        };
                    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
                        admobid = {
                            banner: '', // or DFP format "/6253334/dfp_example_ad"
                            interstitial: ''
                        };
                    } else { // for windows phone
                        admobid = {
                            banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
                            interstitial: 'ca-app-pub-xxx/kkk'
                        };
                    }///
                    AdMob.prepareInterstitial({ adId: admobid.interstitial, autoShow: false });
                    AdMob.createBanner({
                        adId: admobid.banner,
                        position: AdMob.AD_POSITION.BOTTOM_CENTER,
                        autoShow: true,
                        isTesting: false
                    }, function (s) {
                    },
                        function (e) {

                        });
                }
            }, 1000);
            $scope.playMP3 = function (path) {
                try {
                    var myMedia = new Media("tt.mp3");
                    myMedia.play({ playAudioWhenScreenIsLocked: true });
                    alert(myMedia)
                    myMedia.setVolume('1.0');
                } catch (error) {
                    alert(error)
                }
            }
            $scope.Ask = function (path) {
                playMP3(path)
            }
            $scope.Game = { Win: false, Loose: false };


            function playMP3(p) {
                var src = p
                var myMedia =
                    new Media(src,
                        function () { },
                        function (e) { alert('Media Error: ' + JSON.stringify(e)); }
                    );
                myMedia.play();
                myMedia.setVolume('1.0');
            }

            $scope.Colors = [{ name: "Sarı", hex: "#ffeb3b", soundPath: cordova.file.applicationDirectory + "www/audio/sari.m4a" },
            { name: "Kırmızı", hex: "#f44336", soundPath: cordova.file.applicationDirectory + "www/audio/kirmizi.m4a" },
            { name: "Mavi", hex: "#00bcd4", soundPath: cordova.file.applicationDirectory + "www/audio/mavi.m4a" },
            { name: "Yeşil", hex: "#11d419", soundPath: cordova.file.applicationDirectory + "www/audio/yesil.m4a" },
            { name: "Kahverengi", hex: "#795548", soundPath: cordova.file.applicationDirectory + "www/audio/kahverengi.m4a" },
            { name: "Siyah", hex: "#000000", soundPath: cordova.file.applicationDirectory + "www/audio/siyah.m4a" },
            { name: "Beyaz", hex: "#ffffff", soundPath: cordova.file.applicationDirectory + "www/audio/beyaz.m4a" },
            { name: "Mor", hex: "#800080", soundPath: cordova.file.applicationDirectory + "www/audio/mor.m4a" },
            { name: "Lacivert", hex: "#3f51b5", soundPath: cordova.file.applicationDirectory + "www/audio/lacivert.m4a" },
            { name: "Turuncu", hex: "#ff9800", soundPath: cordova.file.applicationDirectory + "www/audio/turuncu.m4a" }];

            $scope.RandomColors = [];
            while ($scope.RandomColors.length != 6) {
                var color = {};
                var colorIndex = Math.floor(Math.random() * Math.floor(10));
                color = angular.copy($scope.Colors[colorIndex]);
                console.log(color);
                var isColorExist = false;
                isColorExist = $scope.RandomColors.findIndex(x => x.name == color.name) == -1 ? false : true;
                if (isColorExist == false) {
                    $scope.RandomColors.push(color);
                }
            }
            $scope.WantedColour = $scope.RandomColors[Math.floor(Math.random() * Math.floor(6))];
            $scope.PickColour = function (name) {
                $(".Loose").removeClass("animate__animated animate__backInDown animate__repeat-3");
                $(".Win").removeClass("animate__animated animate__backInDown animate__repeat-3");
                $scope.Game.Win = false;
                $scope.Game.Loose = false;
                setTimeout(() => {
                    $scope.$apply();
                }, 100);
                setTimeout(() => {
                    if (name == $scope.WantedColour.name) {
                        $scope.Game.Win = true;
                        $scope.Game.Loose = false;
                        $(".Win").addClass("animate__animated animate__backInDown animate__repeat-3");
                    } else {
                        $scope.Game.Win = false;
                        $scope.Game.Loose = true;
                        $(".Loose").addClass("animate__animated animate__backInDown animate__repeat-3");
                    }
                    $scope.$apply()
                }, 300);
            }
        })

        app.config(function (localStorageServiceProvider, $stateProvider, $urlRouterProvider,
            $mdDateLocaleProvider, $mdThemingProvider) {
            localStorageServiceProvider
                .setPrefix('renkbulmaApp')
                .setNotify(true, true);

            $mdThemingProvider.theme('altTheme')
                .primaryPalette('pink')
            $mdThemingProvider.setDefaultTheme('altTheme');
            // $mdDateLocaleProvider.formatDate = function(date) {
            //     return moment(date).format('DD-MM-YYYY');
            //  };
            // Example uses moment.js to parse and format dates.
            $mdDateLocaleProvider.parseDate = function (dateString) {
                var m = moment(dateString, 'L', true);
                return m.isValid() ? m.toDate() : new Date(NaN);
            };

            $mdDateLocaleProvider.formatDate = function (date) {
                if (date == null)
                    return "";
                var m = moment(date);
                return m.isValid() ? m.format('L') : '';
            };


            $urlRouterProvider.otherwise("/Home");
            // Now set up the states

            $stateProvider.state("Home", {
                url: "/Home",
                templateUrl: "Templates/Home.html"
            })
                .state("Profile", {
                    url: "/Profile",
                    templateUrl: "Templates/Profile.html",
                    controller: "ProfileController"
                })
                .state("Register", {
                    url: "/Register",
                    templateUrl: "Templates/Register.html",
                    controller: "RegisterController"
                });
        })




        angular.bootstrap(document.body, ["renkbulmaApp"]);

    },
    onDevicePaused: function () {
        console.log("paused")
    },
    onDeviceResumed: function () {
        console.log("resumed")
    },

};

app.initialize();