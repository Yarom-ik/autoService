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
        WorkType workType2 = new WorkType();
        workType2.id= '08q2v000000TvUEAA0';
        workType2.Name = 'wwwww';
        return workType2;
    }

    @AuraEnabled(cacheable=true)
    public static List<SObJectResult> getResults(String ObjectName, String fieldName, String value) {
        List<SObJectResult> sObjectResultList = new List<SObJectResult>();
        system.debug(fieldName+'-------------'+ObjectName+'---++----------'+value);
        if(String.isNotEmpty(value))
            for(sObject so : Database.Query('Select Id,'+fieldName+' FROM '+ObjectName+' WHERE '+fieldName+' LIKE \'%' + value + '%\'')) {
                String fieldvalue = (String)so.get(fieldName);
                sObjectResultList.add(new SObjectResult(fieldvalue, so.Id));
            }
        
        return sObjectResultList;
    }
    
    public class SObJectResult {
        @AuraEnabled
        public String recName;
        @AuraEnabled
        public Id recId;
        
        public SObJectResult(String recNameTemp, Id recIdTemp) {
            recName = recNameTemp;
            recId = recIdTemp;
        }
    }
}