
angular.module('lecteurManga').controller('NewChapterController', function ($scope, $location, locationParser, flash, ChapterResource , MangaResource, PageResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.chapter = $scope.chapter || {};
    
    $scope.mangaList = MangaResource.queryAll(function(items){
        $scope.mangaSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.title
            });
        });
    });
    $scope.$watch("mangaSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.chapter.manga = {};
            $scope.chapter.manga.id = selection.value;
        }
    });
    
    $scope.pagesList = PageResource.queryAll(function(items){
        $scope.pagesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.image_path
            });
        });
    });
    $scope.$watch("pagesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.chapter.pages = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.chapter.pages.push(collectionItem);
            });
        }
    });


    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The chapter was created successfully.'});
            $location.path('/Chapters');
        };
        var errorCallback = function(response) {
            if(response && response.data) {
                flash.setMessage({'type': 'error', 'text': response.data.message || response.data}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        ChapterResource.save($scope.chapter, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Chapters");
    };
});