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
        // WorkType workType2 = new WorkType();
        // workType2.id= '08q2v000000TvUEAA0';
        // workType2.Name = 'wwwww';
        return workType;
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

    // @AuraEnabled(cacheable=true)
    // public static List<String> getPickListQuantityUnitOfMeasure(){
    //     List<String> pickListValuesList= new List<String>();
    //     Schema.DescribeFieldResult fieldResult = ProductRequired.QuantityUnitOfMeasure.getDescribe();

    //     List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();

    //     for( Schema.PicklistEntry pickListVal : ple){
    //         pickListValuesList.add(pickListVal.getLabel());
    //     } 
    //     return pickListValuesList;
    // }

    @AuraEnabled
    public static String saveProductRequired(ProductRequired productRequired){
        System.debug('productRequired = ' + productRequired);
        // try{
        //     insert productRequired;
        // }
        // catch(Exception ex) {
        //     throw new AuraHandledException(ex.getMessage());
        // }
        return 'ok';
    }

    @AuraEnabled
    public static String saveProductItem(ProductItem productItem){
        System.debug('ProductItem = ' + productItem);
        // try{
        //     insert productItem;
        // }
        // catch(Exception ex) {
        //     throw new AuraHandledException(ex.getMessage());
        // }
        return 'ok';
    }

}