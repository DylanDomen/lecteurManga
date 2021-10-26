
angular.module('lecteurManga').controller('NewMangaController', function ($scope, $location, locationParser, flash, MangaResource , ChapterResource, RatingResource, AccountResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.manga = $scope.manga || {};
    
    $scope.is_deletedList = [
        "true",
        "false"
    ];

    $scope.chaptersList = ChapterResource.queryAll(function(items){
        $scope.chaptersSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.title
            });
        });
    });
    $scope.$watch("chaptersSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.manga.chapters = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.manga.chapters.push(collectionItem);
            });
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
            $scope.manga.ratings = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.manga.ratings.push(collectionItem);
            });
        }
    });

    $scope.accountsList = AccountResource.queryAll(function(items){
        $scope.accountsSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.username
            });
        });
    });
    $scope.$watch("accountsSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.manga.accounts = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.manga.accounts.push(collectionItem);
            });
        }
    });


    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The manga was created successfully.'});
            $location.path('/Mangas');
        };
        var errorCallback = function(response) {
            if(response && response.data) {
                flash.setMessage({'type': 'error', 'text': response.data.message || response.data}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        MangaResource.save($scope.manga, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Mangas");
    };
});