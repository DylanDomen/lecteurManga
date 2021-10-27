

angular.module('lecteurManga').controller('EditChapterController', function($scope, $routeParams, $location, flash, ChapterResource , MangaResource, PageResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.chapter = new ChapterResource(self.original);
            MangaResource.queryAll(function(items) {
                $scope.mangaSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.title
                    };
                    if($scope.chapter.manga && item.id == $scope.chapter.manga.id) {
                        $scope.mangaSelection = labelObject;
                        $scope.chapter.manga = wrappedObject;
                        self.original.manga = $scope.chapter.manga;
                    }
                    return labelObject;
                });
            });
            PageResource.queryAll(function(items) {
                $scope.pagesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.image_path
                    };
                    if($scope.chapter.pages){
                        $.each($scope.chapter.pages, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.pagesSelection.push(labelObject);
                                $scope.chapter.pages.push(wrappedObject);
                            }
                        });
                        self.original.pages = $scope.chapter.pages;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The chapter could not be found.'});
            $location.path("/Chapters");
        };
        ChapterResource.get({ChapterId:$routeParams.ChapterId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.chapter);
    };

    $scope.save = function() {
        var successCallback = function(){
            flash.setMessage({'type':'success','text':'The chapter was updated successfully.'}, true);
            $scope.get();
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        $scope.chapter.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Chapters");
    };

    $scope.remove = function() {
        var successCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The chapter was deleted.'});
            $location.path("/Chapters");
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        }; 
        $scope.chapter.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("mangaSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.chapter.manga = {};
            $scope.chapter.manga.id = selection.value;
        }
    });
    $scope.pagesSelection = $scope.pagesSelection || [];
    $scope.$watch("pagesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.chapter) {
            $scope.chapter.pages = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.chapter.pages.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});