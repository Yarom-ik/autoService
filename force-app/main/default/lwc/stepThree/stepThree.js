import { LightningElement, track, api } from 'lwc';

import getResults from '@salesforce/apex/WorkTypeController.getResults';
import saveProductRequired from '@salesforce/apex/WorkTypeController.saveProductRequired';

// importing to show toast notifictions
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

export default class StepThree extends LightningElement {

    stepValue;
    nextStep() {
        this.stepValue = 4;
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

    //input 222
    @api objectName2 = 'Product2';
    @api fieldName2 = 'Name';
    @api selectRecordId2;
    @api selectRecordName2;
    // @api Label;
    @api searchRecords2 = [];
    @api required2 = false;
    @api iconName2 = 'standard:product'
    @api LoadingText2 = false;
    @track txtclassname2 = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
    @track messageFlag2 = false;
    @track iconFlag2 =  true;
    @track clearIconFlag2 = false;
    @track inputReadOnly2 = false;
   

    searchField2(event) {
        var currentText2 = event.target.value;
        this.LoadingText2 = true;
        
        getResults({ ObjectName: this.objectName2, fieldName: this.fieldName2, value: currentText2  })
        .then(result => {
            this.searchRecords2= result;
            this.LoadingText2 = false;
            
            this.txtclassname2 =  result.length > 0 ? 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open' : 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
            if(currentText2.length > 0 && result.length === 0) {
                this.messageFlag2 = true;
            }
            else {
                this.messageFlag2 = false;
            }

            if(this.selectRecordId2 != null && this.selectRecordId2.length > 0) {
                this.iconFlag2 = false;
                this.clearIconFlag2 = true;
            }
            else {
                this.iconFlag2 = true;
                this.clearIconFlag2 = false;
            }
        })
        .catch(error => {
            window.console.log('-------error-------------'+error);
            window.console.log(error);
        });
        
    }
    
   setSelectedRecord2(event) {
        var currentText = event.currentTarget.dataset.id;
        this.txtclassname2 =  'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
        this.iconFlag2 = false;
        this.clearIconFlag2 = true;
        this.selectRecordName2 = event.currentTarget.dataset.name;
        this.selectRecordId2 = currentText;
        this.inputReadOnly2 = true;
    }
    
    resetData2() {
        this.selectRecordName2 = "";
        this.selectRecordId2 = "";
        this.inputReadOnly2 = false;
        this.iconFlag2 = true;
        this.clearIconFlag2 = false;       
    }

    @track piskListOptions = [{label : 'Each',
                                value : 'Each'}];

    productRequired = { 'sobjectType': 'ProductRequired' };

    setProductInput(event) {
        if (event.target.name === 'quantityRequired') {
            this.productRequired.QuantityRequired = event.target.value;
            // eslint-disable-next-line no-console
            console.log('productRequired ' + this.productRequired.QuantityRequired);
        }
        else if (event.target.name === 'quantityUnitOfMeasure') {
            this.productRequired.QuantityUnitOfMeasure = event.target.value;
            window.console.log('quantityUnitOfMeasure ' + this.productRequired.QuantityUnitOfMeasure);
        }        
    }

    handleSaveProductRequired() {
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputCmp) => {
                inputCmp.reportValidity();
                return validSoFar && inputCmp.checkValidity();
            }, true);
        if (!allValid) {
            // eslint-disable-next-line no-alert
            alert('Please update the invalid form entries and try again.');
            return;
        }
        this.productRequired.ParentRecordId = this.selectRecordId;
        this.productRequired.Product2Id = this.selectRecordId2;
        saveProductRequired({ productRequired: this.productRequired })
            .then(result => {
                //this.workType = {};
                if(result === 'ok'){
                
                    // Show success messsage
                    this.dispatchEvent(new ShowToastEvent({
                        title: 'Success!!',
                        message: 'Product Required Created Successfully!!',
                        variant: 'success'
                    }));
                    this.nextStep();
                }
            })
            .catch(error => {
                this.error = error.message;
            });
    }


}