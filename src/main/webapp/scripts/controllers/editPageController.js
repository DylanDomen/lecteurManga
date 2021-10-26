

angular.module('lecteurManga').controller('EditPageController', function($scope, $routeParams, $location, flash, PageResource , ChapterResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.page = new PageResource(self.original);
            ChapterResource.queryAll(function(items) {
                $scope.chapterSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.title
                    };
                    if($scope.page.chapter && item.id == $scope.page.chapter.id) {
                        $scope.chapterSelection = labelObject;
                        $scope.page.chapter = wrappedObject;
                        self.original.chapter = $scope.page.chapter;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The page could not be found.'});
            $location.path("/Pages");
        };
        PageResource.get({PageId:$routeParams.PageId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.page);
    };

    $scope.save = function() {
        var successCallback = function(){
            flash.setMessage({'type':'success','text':'The page was updated successfully.'}, true);
            $scope.get();
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        $scope.page.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Pages");
    };

    $scope.remove = function() {
        var successCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The page was deleted.'});
            $location.path("/Pages");
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        }; 
        $scope.page.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("chapterSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.page.chapter = {};
            $scope.page.chapter.id = selection.value;
        }
    });
    
    $scope.get();
});