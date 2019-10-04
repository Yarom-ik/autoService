import { LightningElement, track, api} from 'lwc';

// Importing Apex Class method
import saveWorkType from '@salesforce/apex/WorkTypeController.saveWorkType';

//import work type field
// import NAME_FIELD from '@salesforce/schema/WorkType.Name';
// import DESCRIPTION_FIELD from '@salesforce/schema/WorkType.Description';
// import EstimatedDuration_FIELD from '@salesforce/schema/WorkType.EstimatedDuration';
// import DurationType_FIELD from '@salesforce/schema/WorkType.DurationType';
// import ShouldAutoCreateSvcAppt_FIELD from '@salesforce/schema/WorkType.ShouldAutoCreateSvcAppt';

// importing to show toast notifictions
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

import step1 from './stepOne/stepOne.html';
import step2 from './stepTwo/stepTwo.html';
import step3 from './stepThree/stepThree.html';

// import DurationType_FIELD from '@salesforce/schema/WorkType.DurationType';
// import WORKTYPE_OBJECT from '@salesforce/schema/WorkType';
// import { getPicklistValues } from 'lightning/uiObjectInfoApi';
// import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class WorkType extends LightningElement {
    @track error; 
    
    @api show = 1;
 
    nextStep() {
        this.show++;        
    }

    render() {
        switch (this.show) {
            case 1:
              return step1;
            case 2: 
                return step2;
            case 3:
                return step3;
            default:
                return step1;
        }
    }

    workType = { 'sobjectType': 'WorkType' };

    setWorkTypeInput(event){
        if( event.target.name === 'workType' ){
            this.workType.Name = event.target.value;
            // eslint-disable-next-line no-console
            console.log('workType ' + this.workType.Name);
        }
        else if( event.target.name === 'description' ){
            this.workType.Description = event.target.value;
        }
        else if( event.target.name === 'estimatedDuration' ){
            this.workType.EstimatedDuration = event.target.value;
        }
        else if( event.target.name === 'durationType' ){
            this.workType.DurationType = event.target.value;
        }
        else if( event.target.name === 'houldAutoCreateSvcAppt' ){
            this.workType.houldAutoCreateSvcAppt = event.target.cheked;
        }

    }

    handleSaveWorkType() {
        saveWorkType({workType: this.workType})
        .then(result => {
            //this.workType = {};
            window.console.log('result ===> '+result);
            // Show success messsage
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success!!',
                message: 'Work Type Created Successfully!!',
                variant: 'success'
            }),);
        })
        .catch(error => {
            this.error = error.message;
        });
        this.nextStep();
    }

    // @api options;

    // @wire(getObjectInfo, { objectApiName: WORKTYPE_OBJECT })
    // objectInfo;
  
    // @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: DurationType_FIELD })
    // WorkTypePicklistValues({error, data}){
    //     // eslint-disable-next-line no-console
    //     console.log('picklist ttt');
    //     if (data) {
    //         this.options = data.values;
    //       } else if (error) {
    //         // eslint-disable-next-line no-console
    //         console.log(error);
    //     }
    // }  
    connectedCallback() {
        return step1;
    }   
    
}