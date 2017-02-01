import '../style/main.scss';
import ngRoute from 'angular-route';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [ngRoute])
    .controller('MainCtrl', function ($scope, $route, $routeParams, $location) {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
    })

    .controller('FormController', ['$scope', '$http', function ($scope, $http) {
        $scope.preferences = {
            showImage: false
        };

        $scope.newArticleItem = {
            author: "",
            url: "",
            title: "",
            description: "",
            content: ""
        };

        $scope.articleList = [];

        $scope.saveNewArticle = function (newarticle, addArticleForm) {
            let articleList = '';

            if (addArticleForm.$valid) {
                $scope.newArticleItem.author = newarticle.author;
                $scope.newArticleItem.url = newarticle.url;
                $scope.newArticleItem.description = newarticle.description;

                $scope.articleList.push($scope.newArticleItem);
                articleList = angular.toJson($scope.articleList);
                $http.post('http://localhost:2992/api/', articleList, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                    .then(function (data) {
                        console.log(data);
                    }, function (data) {
                        console.log("Something wrong: " + data);
                    }
                );
            }
        };

        $scope.validate = function (newarticle, addArticleForm) {
            if(addArticleForm.title.$valid && addArticleForm.content.$valid) {
                $scope.newArticleItem.title = newarticle.title;
                $scope.newArticleItem.content = newarticle.content;
            }
        };
    }])

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
                controller: 'FormController'
            });
    });

export default MODULE_NAME;
