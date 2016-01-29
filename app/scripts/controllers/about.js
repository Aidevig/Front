'use strict';

/**
 * @ngdoc function
 * @name goSafeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the goSafeApp
 */
angular.module('goSafeApp')
    .controller('AboutCtrl', ['$scope', '$log', 'uiGmapGoogleMapApi', 'geolocation', 'HeatPointsFactory', 'SetPolygonsFactory', '$http', function ($scope, $log, uiGmapGoogleMapApi, geolocation, HeatPointsFactory, SetPolygonsFactory, $http) {
        geolocation.getLocation().then(function(data){
        $scope.coords = {
            lat: data.coords.latitude,
            long: data.coords.longitude
        };
        uiGmapGoogleMapApi.then(function() {
            HeatPointsFactory.getStatements(function(statements){
                function MockHeatLayer(heatLayer) {
                    var insecurePoints = [];
                    for (var i = 0; i < 200; i++) {
                        var lat = statements[i].latitude;
                        var long = statements[i].longitude;
                        insecurePoints.push(new google.maps.LatLng(lat, long));
                    }
                    var pointArray = new google.maps.MVCArray(insecurePoints);
                    $scope.pointArray = pointArray;
                    heatLayer.setData(pointArray);
                    return heatLayer;
                }

                SetPolygonsFactory.getPolygons(function(polygonsArray){
                    $scope.map = {
                        center: {
                            latitude: $scope.coords.lat,
                            longitude: $scope.coords.long
                        },
                        zoom: 15,
                        options: {
                            minZoom: 11,
                            maxZoom: 20
                        },
                        showHeat: true,
                        heatLayerCallback: function(layer) {
                            var mockHeatLayer = new MockHeatLayer(layer);
                            return mockHeatLayer;
                        }
                    };
                    $scope.markers = [
                        {
                            id: 1,
                            latitude: $scope.coords.lat,
                            longitude: $scope.coords.long,
                            icon: {
                                path: "M-10,0 a8,8 1 1,0 8,-8 z M-10,0 a8,8 0 0,1 8,-8 z",
                                fillColor: '#FFFFFF',
                                fillOpacity: 1,
                                strokeWeight: 0
                            }
                        }, {
                            id: 2,
                            latitude: $scope.coords.lat,
                            longitude: $scope.coords.long,
                            icon: {
                                path: "M-8,0 a6,6 1 1,0 6,-6 z M-8,0 a6,6 0 0,1 6,-6 z",
                                fillColor: '#0000FF',
                                fillOpacity: 1,
                                strokeColor: '#0000FF',
                                strokeOpacity: 0.3,
                                strokeWeight: 1
                            }
                        }
                    ];
                    //$scope.polygons = polygonsArray; 
                    /*[
                        {
                            id: 1,
                            path: [
                                {
                                    latitude: 48.827605,
                                    longitude: 2.37133
                                }, {
                                    latitude: 48.822378,
                                    longitude: 2.371523
                                }, {
                                    latitude: 48.821841,
                                    longitude: 2.363284
                                }, {
                                    latitude: 48.826192,
                                    longitude: 2.361653
                                }
                            ],
                            stroke: {
                                weight: 0
                            },
                            fill: {
                                color: '#ff0000',
                                opacity: 0.4
                            }
                        }
                    ];*/
                });
            });
        });
    });
}]);
