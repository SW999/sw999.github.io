import '../style/main.scss';
import ngRoute from 'angular-route';
import FormController from './components/addEditForm/FormController';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [ngRoute])
    .controller('MainCtrl', function ($scope, $route, $routeParams, $location) {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
    })

    .controller('AppCtrl', function ($scope, $routeParams, articles) {
        $scope.name = 'ArticleController';
        $scope.params = $routeParams;
        $scope.articles = JSON.parse(articles.data.data);
    })

    .controller('ArticleController', function ($scope, $routeParams, article) {
        $scope.name = 'ArticleController';
        $scope.params = $routeParams;
        $scope.article = JSON.parse(article.data.data);
    })

    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                template: require('./articles.html'),
                controller: 'AppCtrl',
                resolve: {
                    articles: function ($q, $http) {
                        let deferred = $q.defer();

                        $http.get('http://localhost:2992/api/')
                            .then(function(data) {
                                deferred.resolve(data);
                            });

                        return deferred.promise;
                    }
                }
            })
            .when('/article/:alias', {
                template: require('./article.html'),
                controller: 'ArticleController',
                resolve: {
                    article: function ($q, $http, $location) {
                        let deferred = $q.defer();

                        $http.get('http://localhost:2992/api' + $location.path().replace(/\/article/gi, ''))
                            .then(function(data) {
                                deferred.resolve(data);
                            });

                        return deferred.promise;
                    }
                }
            })
            .when('/add-new', {
                template: require('./components/addEditForm/add-new.html'),
                controller: FormController
            });
    });

export default MODULE_NAME;
