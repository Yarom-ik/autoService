public with sharing class WorkTypeController {

    @AuraEnabled
    public static WorkType saveWorkType(WorkType workType){
        try{
            insert workType;
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
        return workType;
    }

    @AuraEnabled(cacheable=true)
    public static List<SObJectResult> getResults(String ObjectName, String fieldName, String value) {
        List<SObJectResult> sObjectResultList = new List<SObJectResult>();
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

    @AuraEnabled
    public static String saveProductRequired(ProductRequired productRequired){
        try{
            insert productRequired;
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
        return 'ok';
    }

    @AuraEnabled
    public static String saveProductItem(ProductItem productItem){
        try{
            insert productItem;
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
        return 'ok';
    }

}