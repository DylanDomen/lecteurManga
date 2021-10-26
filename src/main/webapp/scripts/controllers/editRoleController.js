

angular.module('lecteurManga').controller('EditRoleController', function($scope, $routeParams, $location, flash, RoleResource , AccountResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.role = new RoleResource(self.original);
            AccountResource.queryAll(function(items) {
                $scope.accountsSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.username
                    };
                    if($scope.role.accounts){
                        $.each($scope.role.accounts, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.accountsSelection.push(labelObject);
                                $scope.role.accounts.push(wrappedObject);
                            }
                        });
                        self.original.accounts = $scope.role.accounts;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The role could not be found.'});
            $location.path("/Roles");
        };
        RoleResource.get({RoleId:$routeParams.RoleId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.role);
    };

    $scope.save = function() {
        var successCallback = function(){
            flash.setMessage({'type':'success','text':'The role was updated successfully.'}, true);
            $scope.get();
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        $scope.role.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Roles");
    };

    $scope.remove = function() {
        var successCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The role was deleted.'});
            $location.path("/Roles");
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        }; 
        $scope.role.$remove(successCallback, errorCallback);
    };
    
    $scope.accountsSelection = $scope.accountsSelection || [];
    $scope.$watch("accountsSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.role) {
            $scope.role.accounts = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.role.accounts.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});