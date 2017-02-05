let app = angular.module("app", []);

export default function ($scope, $http, articles) {
    $scope.articles = JSON.parse(articles.data.data);
}
