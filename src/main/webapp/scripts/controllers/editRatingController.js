

angular.module('lecteurManga').controller('EditRatingController', function($scope, $routeParams, $location, flash, RatingResource , MangaResource, AccountResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.rating = new RatingResource(self.original);
            MangaResource.queryAll(function(items) {
                $scope.manga_RatingSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.title
                    };
                    if($scope.rating.manga_Rating && item.id == $scope.rating.manga_Rating.id) {
                        $scope.manga_RatingSelection = labelObject;
                        $scope.rating.manga_Rating = wrappedObject;
                        self.original.manga_Rating = $scope.rating.manga_Rating;
                    }
                    return labelObject;
                });
            });
            AccountResource.queryAll(function(items) {
                $scope.accountSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.username
                    };
                    if($scope.rating.account && item.id == $scope.rating.account.id) {
                        $scope.accountSelection = labelObject;
                        $scope.rating.account = wrappedObject;
                        self.original.account = $scope.rating.account;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The rating could not be found.'});
            $location.path("/Ratings");
        };
        RatingResource.get({RatingId:$routeParams.RatingId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.rating);
    };

    $scope.save = function() {
        var successCallback = function(){
            flash.setMessage({'type':'success','text':'The rating was updated successfully.'}, true);
            $scope.get();
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        $scope.rating.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Ratings");
    };

    $scope.remove = function() {
        var successCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The rating was deleted.'});
            $location.path("/Ratings");
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        }; 
        $scope.rating.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("manga_RatingSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.rating.manga_Rating = {};
            $scope.rating.manga_Rating.id = selection.value;
        }
    });
    $scope.$watch("accountSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.rating.account = {};
            $scope.rating.account.id = selection.value;
        }
    });
    
    $scope.get();
});