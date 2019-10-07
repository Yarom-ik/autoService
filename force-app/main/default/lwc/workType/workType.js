import { LightningElement, track, api} from 'lwc';

//import work type field
// import NAME_FIELD from '@salesforce/schema/WorkType.Name';
// import DESCRIPTION_FIELD from '@salesforce/schema/WorkType.Description';
// import EstimatedDuration_FIELD from '@salesforce/schema/WorkType.EstimatedDuration';
// import DurationType_FIELD from '@salesforce/schema/WorkType.DurationType';
// import ShouldAutoCreateSvcAppt_FIELD from '@salesforce/schema/WorkType.ShouldAutoCreateSvcAppt';

// import step1 from './stepOne/stepOne.html';
// import step2 from './stepTwo/stepTwo.html';
// import step3 from './stepThree/stepThree.html';

export default class WorkType extends LightningElement {
    @track error; 
    
    @api show = 1;

    @track stepOne = true;
    @track stepTwo = false;
    @track stepThree = false;
    
    showTemplate() {
        switch (this.show) {
            case 1:
                this.stepOne = true;
                this.stepTwo = false;
                this.stepThree = false;
                break;
            case 2: 
                this.stepOne = false;
                this.stepTwo = true;
                this.stepThree = false;
                break;
            case 3:
                this.stepOne = false;
                this.stepTwo = false;
                this.stepThree = true;
                break;
            default:
                this.stepOne = true;
        }
    }     

    hanldeStepValueChange(event) {
        window.console.log('stepOne = false');
        this.show = event.detail;
        this.showTemplate();
    }

    workTypeId;
    hanldeSetWorkTypeId(event) {
        window.console.log('return value = ' + event.detail);
        // eslint-disable-next-line no-unused-vars
        this.workTypeId = event.detail;
        this.workTypeId = JSON.parse(event.detail);
        window.console.log('return value jbj = ' + typeof (this.workTypeId));
        window.console.log('return value Name = ' + this.workTypeId.Name);
    }

    
    @api recordId = '111';
    @api objectApiName;
    
}