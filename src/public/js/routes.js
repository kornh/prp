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
        .when("/users", {
            templateUrl: "/html/userList.html",
            controller: "userListController"
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
app.controller("userListController", function ($scope, $http) {
    $http.get('/api/test-app/app/user').
    then(function (response) {
        $scope.data = response.data;
    });
});