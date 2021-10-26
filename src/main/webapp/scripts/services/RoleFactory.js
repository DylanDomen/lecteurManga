angular.module('lecteurManga').factory('RoleResource', function($resource){
    var resource = $resource('rest/roles/:RoleId',{RoleId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});