angular.module('lecteurManga').factory('ChapterResource', function($resource){
    var resource = $resource('rest/chapters/:ChapterId',{ChapterId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});