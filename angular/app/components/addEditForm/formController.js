let app = angular.module("app", []);

app.controller('FormController', ['$scope', '$http', function ($scope, $http) {
    $scope.preferences = {
        showImage: false
    };

    $scope.newArticleItem = {
        name: "",
        imgUrl: "",
        rate: 0,
        postedBy: ""
    };

/*    $scope.articleList = [];

    $http.get('data/articleList.json').
        success(function (data, status, headers, config) {
            $scope.articleList = JSON.parse(data.article);
        }).
        error(function (data, status, headers, config) {
            console.log("Something wrong: " + data);
        });*/

    $scope.saveNewArticle = function (newarticle, addArticleForm) {
        var articleList;

        if (addArticleForm.$valid) {
            $scope.newArticleItem.name = newarticle.name;
            $scope.articleList.push($scope.newArticleItem);
            articleList = "article=" + angular.toJson($scope.articleList);
            alert(articleList);
/*            $http.post('jsonparse.php', articleList, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).
                success(function (data, status) {
                    console.log(data);
                }).
                error(function (data, status) {
                    console.log("Something wrong: " + data);
                });*/
        }
    };

    $scope.clearPreview = function () {
        angular.element(document.querySelector('.img-preview')).empty();
    };

    $scope.validate = function (newarticle, addArticleForm) {
        if (addArticleForm.thumbImg.$valid) {
            $scope.newArticleItem.imgUrl = newarticle;
        }
    };
}]);

app.directive('clickEnter', ['$rootScope', '$compile', '$document', function($rootScope, $compile, $document) {
    return {
        link: function(scope, element, attrs) {
            scope.sendNewArticleForm = function() {
                angular.element(document.getElementById('sendButton')).triggerHandler('click');
            };

            $document.on("keydown", function(event) {
                if(event.which === 13) {
                    event.preventDefault();
                    scope.$eval(attrs.clickEnter);
                }
            });
        }
    }
}]);

/*app.directive('showImg', function() {
    var preview = angular.element('<div class="img-preview">Image preview:<br><img alt="preview"></div>');

    return {
        scope: {
            showImg: "="
        },
        link: function(scope, element, attrs) {
            scope.$watch('showImg', function(value) {
                if(value) {
                    preview.find('img').attr('src', value);
                    element.parent().after(preview);
                }
            });
        }
    }
});*/
