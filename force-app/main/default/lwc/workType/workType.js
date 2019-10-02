import { LightningElement, track } from 'lwc';

// Importing Apex Class method
import saveWorkType from '@salesforce/apex/WorkTypeController.saveWorkType';

// importing to show toast notifictions
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

//import work type field
import NAME_FIELD from '@salesforce/schema/WorkType.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/WorkType.Description';
import EstimatedDuration_FIELD from '@salesforce/schema/WorkType.EstimatedDuration';
import DurationType_FIELD from '@salesforce/schema/WorkType.DurationType';
import ShouldAutoCreateSvcAppt_FIELD from '@salesforce/schema/WorkType.ShouldAutoCreateSvcAppt';

export default class WorkType extends LightningElement {
    @track error;

    @track stepOne = true;
    @track stepTwo = false;

    @track workType = {
        Name : NAME_FIELD,
        Description : DESCRIPTION_FIELD,
        EstimatedDuration : EstimatedDuration_FIELD,
        DurationType : DurationType_FIELD,
        houldAutoCreateSvcAppt : ShouldAutoCreateSvcAppt_FIELD
    };

    nextStep(){
        this.stepOne = false;
        this.stepTwo = true;
    }

    handleSaveWorkType() {
        saveWorkType({objWorkType: this.workType})
        .then(result => {
            // Clear the user enter values
            this.workType = {};

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
    }
}