
angular.module('lecteurManga').controller('NewRatingController', function ($scope, $location, locationParser, flash, RatingResource , MangaResource, AccountResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.rating = $scope.rating || {};
    
    $scope.manga_RatingList = MangaResource.queryAll(function(items){
        $scope.manga_RatingSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.title
            });
        });
    });
    $scope.$watch("manga_RatingSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.rating.manga_Rating = {};
            $scope.rating.manga_Rating.id = selection.value;
        }
    });
    
    $scope.accountList = AccountResource.queryAll(function(items){
        $scope.accountSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.username
            });
        });
    });
    $scope.$watch("accountSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.rating.account = {};
            $scope.rating.account.id = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The rating was created successfully.'});
            $location.path('/Ratings');
        };
        var errorCallback = function(response) {
            if(response && response.data) {
                flash.setMessage({'type': 'error', 'text': response.data.message || response.data}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        RatingResource.save($scope.rating, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Ratings");
    };
});