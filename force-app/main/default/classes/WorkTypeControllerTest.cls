@isTest
public with sharing class WorkTypeControllerTest {
    
    @isTest static void saveWorkTypeTest(){
        WorkType workType = new WorkType();
        workType.Name = 'test';
        workType.Description = 'test';
        workType.EstimatedDuration = 3;
        workType.DurationType = 'Hours';
        Test.startTest();
        WorkType workType2 = WorkTypeController.saveWorkType(workType);
        Test.stopTest();
        System.assertEquals(workType.Name, workType2.Name);
    }
    @isTest static void saveWorkTypeExceptionTest(){
        WorkType workType = new WorkType();
        //workType.Name = 'test';
        workType.Description = 'test';
        //workType.EstimatedDuration = 3;
        workType.DurationType = 'Hours';
        Test.startTest();
        WorkType workType2;
        try{
            workType2 = WorkTypeController.saveWorkType(workType);
        } catch(Exception e){
            
        }
        Test.stopTest();
        System.assertEquals(null, workType2);
    }
    
    public class SObJectResult {        
        public String recName;        
        public Id recId;
        
        public SObJectResult(String recNameTemp, Id recIdTemp) {
            recName = recNameTemp;
            recId = recIdTemp;
        }
    }
    @isTest static void getResultsTest(){
        WorkType workType = new WorkType();
        workType.Name = 'test';
        workType.Description = 'test';
        workType.EstimatedDuration = 3;
        workType.DurationType = 'Hours';
        insert workType;
        List<WorkTypeController$SObJectResult> sObjectResultList = new List<WorkTypeController$SObJectResult>();
        Test.startTest();
        sObjectResultList = WorkTypeController.getResults('WorkType','Name', 'test');        
        WorkTypeController.getResults('WorkType','Name', 'test');
        Test.stopTest();
        System.assertEquals('test', sObjectResultList[0].recName);  
        System.assertEquals(1, sObjectResultList.size());  
    }
    
    @isTest static void saveProductRequiredTest(){
        WorkType workType = new WorkType();
        workType.Name = 'test';
        workType.Description = 'test';
        workType.EstimatedDuration = 3;
        workType.DurationType = 'Hours';
        insert workType;
        Product2 product = new Product2();
        product.Name = 'test';
        insert product;
        ProductRequired pr = new ProductRequired(ParentRecordId = workType.Id,
                                                 Product2Id = product.Id,
                                                 QuantityRequired = 2);
        Test.startTest();
        String result;
        result = WorkTypeController.saveProductRequired(pr);
        Test.stopTest();
        System.assertEquals('ok', result);
    }
    
    @isTest static void saveProductRequiredExceptionTest(){
        ProductRequired pr = new ProductRequired(QuantityRequired = 2);
        Test.startTest();
        String result;
         try{
            result = WorkTypeController.saveProductRequired(pr);
        } catch(Exception e){
            
        }
        Test.stopTest();
        System.assertEquals(null, result);
    }
    
    @isTest static void saveProductItemTest(){
        Product2 product = new Product2();
        product.Name = 'test';
        insert product;
        ProductItem prI = new ProductItem(Product2Id = product.Id,
                                         QuantityOnHand = 2);
        Test.startTest();
        String result;
         try{
            result = WorkTypeController.saveProductItem(prI);
        } catch(Exception e){
            
        }
        Test.stopTest();
        System.assertEquals(null, result);
        
        
    }
    
}