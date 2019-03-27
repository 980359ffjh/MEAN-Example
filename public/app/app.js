angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
        .when('/', { templateUrl: '/clientApp/app', controller: 'appController' });
});

angular.module('app').controller('appController', function ($scope) {
    $scope.hello = "Hello Angular";
});