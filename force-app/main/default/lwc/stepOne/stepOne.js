import { LightningElement, track, api} from 'lwc';

//import work type field
import NAME_FIELD from '@salesforce/schema/WorkType.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/WorkType.Description';
import EstimatedDuration_FIELD from '@salesforce/schema/WorkType.EstimatedDuration';
import DurationType_FIELD from '@salesforce/schema/WorkType.DurationType';
import ShouldAutoCreateSvcAppt_FIELD from '@salesforce/schema/WorkType.ShouldAutoCreateSvcAppt';

export default class StepOne extends LightningElement {

    @api
    _stepTwo = false;
    get stepTwo() {
        return this._stepTwo;
    }
    set stepTwo(value) {
        this._stepTwo = value;
    }

     // Navigation to lightning component
     navigateToComponent() {
        
    }


    @track workType = {
        Name : NAME_FIELD,
        Description : DESCRIPTION_FIELD,
        EstimatedDuration : EstimatedDuration_FIELD,
        DurationType : DurationType_FIELD,
        houldAutoCreateSvcAppt : ShouldAutoCreateSvcAppt_FIELD
    };

    
}