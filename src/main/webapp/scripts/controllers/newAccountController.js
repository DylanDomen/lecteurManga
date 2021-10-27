
angular.module('lecteurManga').controller('NewAccountController', function ($scope, $location, locationParser, flash, AccountResource , RoleResource, RatingResource, MangaResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.account = $scope.account || {};
    
    $scope.roleList = RoleResource.queryAll(function(items){
        $scope.roleSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.name
            });
        });
    });
    $scope.$watch("roleSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.account.role = {};
            $scope.account.role.id = selection.value;
        }
    });
    
    $scope.ratingsList = RatingResource.queryAll(function(items){
        $scope.ratingsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.rating
            });
        });
    });
    $scope.$watch("ratingsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.account.ratings = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.account.ratings.push(collectionItem);
            });
        }
    });

    $scope.mangaList = MangaResource.queryAll(function(items){
        $scope.mangaSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.title
            });
        });
    });
    $scope.$watch("mangaSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.account.manga = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.account.manga.push(collectionItem);
            });
        }
    });


    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The account was created successfully.'});
            $location.path('/Accounts');
        };
        var errorCallback = function(response) {
            if(response && response.data) {
                flash.setMessage({'type': 'error', 'text': response.data.message || response.data}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        AccountResource.save($scope.account, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Accounts");
    };
});