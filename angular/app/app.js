import '../style/main.scss';
import ngRoute from 'angular-route';

import formController from './controllers/addEditForm/formController';
import articlesController from './controllers/articlesPage/articlesController';
import articleController from './controllers/articlePage/articleController';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [ngRoute])
    .controller('MainCtrl', function ($scope, $route, $routeParams, $location) {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
    })

    .controller('formController', formController)

    .controller('articlesController', articlesController)

    .controller('articleController', articleController)

    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                template: require('./controllers/articlesPage/articles.html'),
                controller: 'articlesController',
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
                template: require('./controllers/articlePage/article.html'),
                controller: 'articleController',
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
                template: require('./controllers/addEditForm/add-new.html'),
                controller: formController
            });
    });

export default MODULE_NAME;
