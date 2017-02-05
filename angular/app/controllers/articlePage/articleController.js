let app = angular.module("app", []);

export default function ($scope, $http, article) {
    $scope.article = JSON.parse(article.data.data);
}
