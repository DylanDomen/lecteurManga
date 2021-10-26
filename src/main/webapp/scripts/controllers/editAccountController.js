

angular.module('lecteurManga').controller('EditAccountController', function($scope, $routeParams, $location, flash, AccountResource , RoleResource, RatingResource, MangaResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.account = new AccountResource(self.original);
            RoleResource.queryAll(function(items) {
                $scope.roleSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.name
                    };
                    if($scope.account.role && item.id == $scope.account.role.id) {
                        $scope.roleSelection = labelObject;
                        $scope.account.role = wrappedObject;
                        self.original.role = $scope.account.role;
                    }
                    return labelObject;
                });
            });
            RatingResource.queryAll(function(items) {
                $scope.ratingsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.rating
                    };
                    if($scope.account.ratings){
                        $.each($scope.account.ratings, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.ratingsSelection.push(labelObject);
                                $scope.account.ratings.push(wrappedObject);
                            }
                        });
                        self.original.ratings = $scope.account.ratings;
                    }
                    return labelObject;
                });
            });
            MangaResource.queryAll(function(items) {
                $scope.mangaSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.title
                    };
                    if($scope.account.manga){
                        $.each($scope.account.manga, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.mangaSelection.push(labelObject);
                                $scope.account.manga.push(wrappedObject);
                            }
                        });
                        self.original.manga = $scope.account.manga;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The account could not be found.'});
            $location.path("/Accounts");
        };
        AccountResource.get({AccountId:$routeParams.AccountId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.account);
    };

    $scope.save = function() {
        var successCallback = function(){
            flash.setMessage({'type':'success','text':'The account was updated successfully.'}, true);
            $scope.get();
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        $scope.account.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Accounts");
    };

    $scope.remove = function() {
        var successCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The account was deleted.'});
            $location.path("/Accounts");
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        }; 
        $scope.account.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("roleSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.account.role = {};
            $scope.account.role.id = selection.value;
        }
    });
    $scope.ratingsSelection = $scope.ratingsSelection || [];
    $scope.$watch("ratingsSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.account) {
            $scope.account.ratings = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.account.ratings.push(collectionItem);
            });
        }
    });
    $scope.mangaSelection = $scope.mangaSelection || [];
    $scope.$watch("mangaSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.account) {
            $scope.account.manga = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.account.manga.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});