import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromPromise';
import 'whatwg-fetch';

@Component({
    selector: 'app-repos',
    templateUrl: './repos.component.html',
    styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit {

	public repo: Array<Repo>;
	public total: number; 
	public isSpinner: boolean;
    public onPage: number;
    public currentPage: number = 1;
    public maxSize:number = 5;
    private inputEl: string;
    private error: Array<ErrorResponce>;
    private BASE_URL: string = 'https://api.github.com/search/repositories';

    public sequence$: Subject<KeyboardEvent> = new Subject<KeyboardEvent>();

    constructor(private _http: Http) {}

    getSearch( $event: KeyboardEvent ) {
    	
        this.sequence$.next($event);

    }

    public ngOnInit() {
    	this.sequence$
        	.debounceTime(500)
        	.map( (event: KeyboardEvent) => {

        		this.isSpinner = true;
                this.inputEl = (event.target as HTMLInputElement).value;

                if(this.inputEl) {
                    return this.inputEl
                }
        		return 0;
        	})
        	.switchMap( (inputEl: string) => Observable
        		.fromPromise(fetch(this.BASE_URL + `?q=${inputEl}`)
        		.then(res => res.json())))
            	.subscribe( res => {

            		this.isSpinner = false;
            		this.repo = res['items'];
            		this.total = res['total_count'];
                    this.onPage = res['items'].length;
            	});
    }

    public pageChanged(event:any):void {

        this._http.get(this.BASE_URL + `?q=${this.inputEl}&page=${event.page}`)
            .map((res: Response) => { 
                return res.json();
            }).catch((error:any) => {
                this.error = JSON.parse( error._body);
                return Observable.throw(error || 'Server error');
            }).do((responce) => {
                this.repo = responce['items'];
                this.total = responce['total_count'];
                this.onPage = responce['items'].length;
                this.error = [];
            }).subscribe();
    }

}

