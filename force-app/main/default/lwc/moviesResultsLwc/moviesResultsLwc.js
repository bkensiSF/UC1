import { LightningElement ,wire,track,api} from 'lwc';
import getAllMovies from '@salesforce/apex/MovieService.getAllMovies';
import SearchChannel__c from '@salesforce/messageChannel/SearchChannel__c';
import PreviewChannel from '@salesforce/messageChannel/PreviewChannel__c';
import { subscribe,publish, MessageContext } from 'lightning/messageService';


export default class MoviesResultsLwc extends LightningElement {

    @track movies

    @api valuepassed;


    subscription = null;
	@track empty =false
    @wire(MessageContext)
    messageContext;

    handleSubscribe() {
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(this.messageContext, SearchChannel__c, (message) => {
		this.empty = false;

			if (message.keyWord.length >0) {
				this.movies  =this.movies.filter( movie => movie.Name.toLowerCase().includes(message.keyWord.toLowerCase()))
				if (this.movies.length==0) {
					this.empty =true
				}
			}else{
				this.empty = false;
				this.loadMovies();
			}
        });
    }

    connectedCallback() {
		this.loadMovies();
		this.handleSubscribe();
	}
    
	loadMovies() {
		getAllMovies()
			.then(result => {
				
				this.movies = result;
			})
			.catch(error => {
				this.error = error;
			});
	}
	handleClick =(e)=>{
		let movieId = {movieId: e.target.dataset.id};
        publish(this.messageContext, PreviewChannel, movieId);
	}
}