angular.module('lecteurManga').factory('AccountResource', function($resource){
    var resource = $resource('rest/accounts/:AccountId',{AccountId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});