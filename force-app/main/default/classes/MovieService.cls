public with sharing class MovieService {

    @AuraEnabled(cacheable=true)
    public static List<Movie__c> getAllMovies(){

    return [SELECT Name, Category__c,Description__c ,Release_date__c FROM Movie__c];
        
    }
    @AuraEnabled(cacheable=true)
    public static List<Movie__c> getOneMovie(String movieId){

    return [SELECT Name, Category__c,Description__c ,Release_date__c FROM Movie__c WHERE Id = :movieId ];
        
    }
}
