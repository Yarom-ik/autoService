import { LightningElement, track, api } from 'lwc';

import getResults from '@salesforce/apex/WorkTypeController.getResults';

export default class StepThree extends LightningElement {

    stepValue;
    nextStep() {
        this.stepValue = 1;
        // Creates the event with the data.
        const selectedEvent = new CustomEvent("stepvaluechange", {
            detail: this.stepValue
        });
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }

    @api objectName = 'WorkType';
    @api fieldName = 'Name';
    @api selectRecordId;
    @api selectRecordName;
    // @api Label;
    @api searchRecords = [];
    @api required = false;
    @api iconName = 'standard:work_type'
    @api LoadingText = false;
    @track txtclassname = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
    @track messageFlag = false;
    @track iconFlag =  false;
    @track clearIconFlag = true;
    @track inputReadOnly = false;
   

    searchField(event) {
        var currentText = event.target.value;
        this.LoadingText = true;
        
        getResults({ ObjectName: this.objectName, fieldName: this.fieldName, value: currentText  })
        .then(result => {
            this.searchRecords= result;
            this.LoadingText = false;
            
            this.txtclassname =  result.length > 0 ? 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open' : 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
            if(currentText.length > 0 && result.length === 0) {
                this.messageFlag = true;
            }
            else {
                this.messageFlag = false;
            }

            if(this.selectRecordId != null && this.selectRecordId.length > 0) {
                this.iconFlag = false;
                this.clearIconFlag = true;
            }
            else {
                this.iconFlag = true;
                this.clearIconFlag = false;
            }
        })
        .catch(error => {
            window.console.log('-------error-------------'+error);
            window.console.log(error);
        });
        
    }
    
   setSelectedRecord(event) {
        var currentText = event.currentTarget.dataset.id;
        this.txtclassname =  'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
        this.iconFlag = false;
        this.clearIconFlag = true;
        this.selectRecordName = event.currentTarget.dataset.name;
        // let selectName = event.currentTarget.dataset.name;
        this.selectRecordId = currentText;
        this.inputReadOnly = true;
        // const selectedEvent = new CustomEvent('selected', { detail: {selectName}, });
        // // Dispatches the event.
        // this.dispatchEvent(selectedEvent);
    }
    
    resetData() {
        this.selectRecordName = "";
        this.selectRecordId = "";
        this.inputReadOnly = false;
        this.iconFlag = true;
        this.clearIconFlag = false;
       
    }


}