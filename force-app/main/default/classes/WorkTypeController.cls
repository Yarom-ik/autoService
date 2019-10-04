public with sharing class WorkTypeController {

    @AuraEnabled
    public static WorkType saveWorkType(WorkType workType){
        System.debug('save work type ' + workType);
        // try{
        //     insert workType;
        // }
        // catch(Exception ex) {
        //     throw new AuraHandledException(ex.getMessage());
        // }
        return workType;
    }
}
