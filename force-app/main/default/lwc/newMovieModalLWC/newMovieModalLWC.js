import { api } from 'lwc';
import LightningModal from 'lightning/modal';

import NAME_FIELD from '@salesforce/schema/Movie__c.Name';
import TYPE_FIELD from '@salesforce/schema/Movie__c.Category__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Movie__c.Description__c';
import REALEASE_FIELD from '@salesforce/schema/Movie__c.Release_date__c';
//import ACTOR_FIELD from '@salesforce/schema/Movie__c.Phone';

import MOVIE_OBJECT from '@salesforce/schema/Movie__c';

export default class NewMovieModalLWC extends LightningModal {

    @api recordId;
    objectApiName = MOVIE_OBJECT;

    nameField = NAME_FIELD;
    typeField = TYPE_FIELD;
    descriptionField = DESCRIPTION_FIELD;
    realeaseField = REALEASE_FIELD;

    handleOkay() {
        this.close('okay');
    }

    handleSuccess(event) {
        console.log('event ',event)
        this.close('test');
    }

}