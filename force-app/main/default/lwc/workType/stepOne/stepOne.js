import { LightningElement, api, wire} from 'lwc';

import DurationType_FIELD from '@salesforce/schema/WorkType.DurationType';
import WORKTYPE_OBJECT from '@salesforce/schema/WorkType';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class StepOne extends LightningElement {

    @api options;

    get options(){
        return this.options;
    }

    @wire(getObjectInfo, { objectApiName: WORKTYPE_OBJECT })
    objectInfo;
  
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: DurationType_FIELD })
    WorkTypePicklistValues({error, data}){
        // eslint-disable-next-line no-console
        console.log('picklist');
        if (data) {
            this.options = data.values;
          } else if (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    }  
    
    connectedCallback() {
        // this.helloWorld()
        this.WorkTypePicklistValues();
    }
}