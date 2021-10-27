angular.module('lecteurManga').factory('MangaResource', function($resource){
    var resource = $resource('rest/mangas/:MangaId',{MangaId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});