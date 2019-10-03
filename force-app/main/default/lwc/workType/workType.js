import { LightningElement, track, api} from 'lwc';

// Importing Apex Class method
import saveWorkType from '@salesforce/apex/WorkTypeController.saveWorkType';

// importing to show toast notifictions
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class WorkType extends LightningElement {
    @track error; 
    
    @track stepOne = true;
    @api stepTwo = false;
    @track stepThree = false;
    @track stepFour = false;

    nextStep(){
            this.stepOne = false;
            this.stepTwo = true;
            this.stepThree = false;        
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