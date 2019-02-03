var app = angular.module('Admin-App', ['ngMaterial', 'ngMessages', 'ngRoute']);

var AdminViewController = function ($scope, $mdSidenav, $location) {
    var Controller = this;
    Controller.openSidenav = function () {
        $mdSidenav('left').toggle()
    };
    Controller.openPage = function (page) {
        $location.path(page);
        $mdSidenav('left').close();
    }
}
app.component("adminView", {
    controller: AdminViewController,
    templateUrl: '/html/adminView.html'
})
var LoginViewController = function ($scope) {

}
app.component("loginView", {
    controller: LoginViewController,
    templateUrl: '/html/loginView.html'
})