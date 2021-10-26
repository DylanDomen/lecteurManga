angular.module('lecteurManga').factory('PageResource', function($resource){
    var resource = $resource('rest/pages/:PageId',{PageId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});