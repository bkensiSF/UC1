import { LightningElement,wire,track } from 'lwc';
import { subscribe,publish, MessageContext } from 'lightning/messageService';
import PreviewChannel__c from '@salesforce/messageChannel/PreviewChannel__c';
export default class MoviePreviewLwc extends LightningElement
{
    @track movie
    subscription = null;
    @wire(MessageContext)
    messageContext;

    handleSubscribe() {
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(this.messageContext, PreviewChannel__c, (message)  => {

            let movieID = message.movieId
            console.log("movieID",movieID)
            // fetcharticle(message.movieId)
            loadMovies(movieID);
        });
    }
    loadMovies(movieID) {
        getOneMovie(movieID)
        .then(result => {
            console.log(result)
            
            this.movie = result;
        })
        .catch(error => {
            this.error = error;
        });
	}
	fetcharticle(movieId) {
        console.log("i'm here")
	}

    connectedCallback() {
		this.handleSubscribe();
	}
}