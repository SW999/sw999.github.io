let app = angular.module("app", []);

export default function ($scope, $http, $httpParamSerializer) {

    $scope.newArticleItem = {
        author: "",
        url: "",
        title: "",
        description: "",
        content: ""
    };

    $scope.articleList = [];

    $scope.saveNewArticle = function (newarticle, addArticleForm) {
        if (addArticleForm.$valid) {
            $scope.newArticleItem.author = newarticle.author;
            $scope.newArticleItem.url = newarticle.url;
            $scope.newArticleItem.description = newarticle.description;
            $scope.newArticleItem.title = newarticle.title;
            $scope.newArticleItem.content = newarticle.content;

            $scope.articleList.push($scope.newArticleItem);
            $http.post('http://localhost:2992/api/', $httpParamSerializer($scope.newArticleItem), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                .then(function (data) {
                    window.location = "/#!/";
                    }, function (data) {
                        console.log("Something wrong: " + data);
                    }
                );
        }
    };

    $scope.validate = function (newarticle, addArticleForm) {
        addArticleForm.content.$validators.content = function(modelValue) {
            return modelValue.length >= 20;
        };
    };
}
