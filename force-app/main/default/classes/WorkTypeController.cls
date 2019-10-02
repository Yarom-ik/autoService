public with sharing class WorkTypeController {

    @AuraEnabled
    public static string saveWorkType(WorkType workType){
        try{
            insert workType;
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
        
    }
}
