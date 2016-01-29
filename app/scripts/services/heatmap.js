'use strict';

angular.module('frontEndServices', ['ngResource'])
    .factory('HeatPointsFactory', ['$resource', function ($resource){
        var startUrl = 'http://localhost:8000/aidvige/all/';
        return $resource(startUrl, {}, {
            getStatements: {
                method: 'GET',
                isArray: true,
                url: ''
            }
        });
    }])

    .factory('SetPolygonsFactory', ['$resource', function($resource){
        var startUrl = 'http://localhost:8000/aidvige/';
        return $resource(startUrl, {}, {
            getPolygons: {
                method: 'GET',
                isArray: true,
                url: ''
            }
        });
    }]);
