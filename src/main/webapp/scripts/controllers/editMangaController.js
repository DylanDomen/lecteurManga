

angular.module('lecteurManga').controller('EditMangaController', function($scope, $routeParams, $location, flash, MangaResource , ChapterResource, RatingResource, AccountResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.manga = new MangaResource(self.original);
            ChapterResource.queryAll(function(items) {
                $scope.chaptersSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.title
                    };
                    if($scope.manga.chapters){
                        $.each($scope.manga.chapters, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.chaptersSelection.push(labelObject);
                                $scope.manga.chapters.push(wrappedObject);
                            }
                        });
                        self.original.chapters = $scope.manga.chapters;
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
                    if($scope.manga.ratings){
                        $.each($scope.manga.ratings, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.ratingsSelection.push(labelObject);
                                $scope.manga.ratings.push(wrappedObject);
                            }
                        });
                        self.original.ratings = $scope.manga.ratings;
                    }
                    return labelObject;
                });
            });
            AccountResource.queryAll(function(items) {
                $scope.accountsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.username
                    };
                    if($scope.manga.accounts){
                        $.each($scope.manga.accounts, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.accountsSelection.push(labelObject);
                                $scope.manga.accounts.push(wrappedObject);
                            }
                        });
                        self.original.accounts = $scope.manga.accounts;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The manga could not be found.'});
            $location.path("/Mangas");
        };
        MangaResource.get({MangaId:$routeParams.MangaId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.manga);
    };

    $scope.save = function() {
        var successCallback = function(){
            flash.setMessage({'type':'success','text':'The manga was updated successfully.'}, true);
            $scope.get();
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        $scope.manga.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Mangas");
    };

    $scope.remove = function() {
        var successCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The manga was deleted.'});
            $location.path("/Mangas");
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        }; 
        $scope.manga.$remove(successCallback, errorCallback);
    };
    
    $scope.is_deletedList = [
        "true",
        "false"
    ];
    $scope.chaptersSelection = $scope.chaptersSelection || [];
    $scope.$watch("chaptersSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.manga) {
            $scope.manga.chapters = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.manga.chapters.push(collectionItem);
            });
        }
    });
    $scope.ratingsSelection = $scope.ratingsSelection || [];
    $scope.$watch("ratingsSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.manga) {
            $scope.manga.ratings = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.manga.ratings.push(collectionItem);
            });
        }
    });
    $scope.accountsSelection = $scope.accountsSelection || [];
    $scope.$watch("accountsSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.manga) {
            $scope.manga.accounts = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.manga.accounts.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});