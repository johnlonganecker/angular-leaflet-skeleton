angular.module('myApp')
    .controller('HomepageCtrl', function($scope, leafletService) {
        leafletService.createMap();
    });
