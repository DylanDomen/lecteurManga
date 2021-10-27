angular.module('lecteurManga').factory('RatingResource', function($resource){
    var resource = $resource('rest/ratings/:RatingId',{RatingId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});