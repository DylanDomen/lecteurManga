'use strict';

angular.module('lecteurManga',['ngRoute','ngResource'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',{templateUrl:'views/landing.html',controller:'LandingPageController'})
      .when('/Accounts',{templateUrl:'views/Account/search.html',controller:'SearchAccountController'})
      .when('/Accounts/new',{templateUrl:'views/Account/detail.html',controller:'NewAccountController'})
      .when('/Accounts/edit/:AccountId',{templateUrl:'views/Account/detail.html',controller:'EditAccountController'})
      .when('/Chapters',{templateUrl:'views/Chapter/search.html',controller:'SearchChapterController'})
      .when('/Chapters/new',{templateUrl:'views/Chapter/detail.html',controller:'NewChapterController'})
      .when('/Chapters/edit/:ChapterId',{templateUrl:'views/Chapter/detail.html',controller:'EditChapterController'})
      .when('/Mangas',{templateUrl:'views/Manga/search.html',controller:'SearchMangaController'})
      .when('/Mangas/new',{templateUrl:'views/Manga/detail.html',controller:'NewMangaController'})
      .when('/Mangas/edit/:MangaId',{templateUrl:'views/Manga/detail.html',controller:'EditMangaController'})
      .when('/Pages',{templateUrl:'views/Page/search.html',controller:'SearchPageController'})
      .when('/Pages/new',{templateUrl:'views/Page/detail.html',controller:'NewPageController'})
      .when('/Pages/edit/:PageId',{templateUrl:'views/Page/detail.html',controller:'EditPageController'})
      .when('/Ratings',{templateUrl:'views/Rating/search.html',controller:'SearchRatingController'})
      .when('/Ratings/new',{templateUrl:'views/Rating/detail.html',controller:'NewRatingController'})
      .when('/Ratings/edit/:RatingId',{templateUrl:'views/Rating/detail.html',controller:'EditRatingController'})
      .when('/Roles',{templateUrl:'views/Role/search.html',controller:'SearchRoleController'})
      .when('/Roles/new',{templateUrl:'views/Role/detail.html',controller:'NewRoleController'})
      .when('/Roles/edit/:RoleId',{templateUrl:'views/Role/detail.html',controller:'EditRoleController'})
      .otherwise({
        redirectTo: '/'
      });
  }])
  .controller('LandingPageController', function LandingPageController() {
  })
  .controller('NavController', function NavController($scope, $location) {
    $scope.matchesRoute = function(route) {
        var path = $location.path();
        return (path === ("/" + route) || path.indexOf("/" + route + "/") == 0);
    };
  });
