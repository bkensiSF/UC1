import { LightningElement, api,wire } from 'lwc';
import NewMovieModalLWC from 'c/newMovieModalLWC';
import SearchChannel from '@salesforce/messageChannel/SearchChannel__c';
import {publish, MessageContext} from 'lightning/messageService'

export default class FilterMoviesLwc extends LightningElement {

 @wire(MessageContext)
 messageContext;

 @api
 searchTerm
    
handleClick = async ( ) =>(await NewMovieModalLWC.open({ size: 'large', description: 'Accessible description of modal\'s purpose'}))
   
handleSearchTermChange =(e)=>{

        let keyWord = {keyWord: e.detail.value};
        publish(this.messageContext, SearchChannel, keyWord);

    }
}




        