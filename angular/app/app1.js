angular.module('app', ['ngRoute'])

    .controller('AppCtrl', function ($scope, $route, $routeParams, $location) {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
    })

    .controller('ArticleController', function ($scope, $routeParams) {
        $scope.name = 'ArticleController';
        $scope.params = $routeParams;
    })

    .config(function ($routeProvider) {
        $routeProvider
            .when('/article/:articleId', {
                templateUrl: 'article.html',
                controller: 'ArticleController'
            });
    });
