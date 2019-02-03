app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/html/dashboardView.html",
            controller: "dashboardController"
        })
        .when("/collections", {
            templateUrl: "/html/collectionList.html",
            controller: "collectionListController"
        })
});
app.controller("dashboardController", function ($scope) {

});
app.controller("collectionListController", function ($scope, $http) {
    $http.get('/api/test-app/').
    then(function (response) {
        $scope.data = response.data;
    });
});