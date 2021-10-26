
angular.module('lecteurManga').controller('NewPageController', function ($scope, $location, locationParser, flash, PageResource , ChapterResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.page = $scope.page || {};
    
    $scope.chapterList = ChapterResource.queryAll(function(items){
        $scope.chapterSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.title
            });
        });
    });
    $scope.$watch("chapterSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.page.chapter = {};
            $scope.page.chapter.id = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The page was created successfully.'});
            $location.path('/Pages');
        };
        var errorCallback = function(response) {
            if(response && response.data) {
                flash.setMessage({'type': 'error', 'text': response.data.message || response.data}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        PageResource.save($scope.page, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Pages");
    };
});