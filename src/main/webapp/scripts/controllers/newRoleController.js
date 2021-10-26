
angular.module('lecteurManga').controller('NewRoleController', function ($scope, $location, locationParser, flash, RoleResource , AccountResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.role = $scope.role || {};
    
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
            $scope.role.accounts = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.role.accounts.push(collectionItem);
            });
        }
    });


    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The role was created successfully.'});
            $location.path('/Roles');
        };
        var errorCallback = function(response) {
            if(response && response.data) {
                flash.setMessage({'type': 'error', 'text': response.data.message || response.data}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        RoleResource.save($scope.role, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Roles");
    };
});