import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  numberSubscription : Subscription;
  customSubscription : Subscription;
  constructor() { }

  ngOnInit() {
  	const myNumber = Observable.interval(1000);
  	this.numberSubscription = myNumber.subscribe(
  		(number:Number) => {
  			console.log(number);
  		}
  	);


  	const myObservable = Observable.create(
  		(observer: Observer<string>) => {
  			setTimeout(()=>{
  				observer.next('First package');
  			}, 2000);
  			setTimeout(()=>{
  				observer.next('second package');
  			}, 4000);
  			setTimeout(()=>{
  				observer.next('Error');
  				//observer.complete();
  			}, 5000);
  		});
  	this.customSubscription = myObservable.subscribe(
  		(data:string)=>{
  			console.log(data);
  		},
  		(error:string)=>{
  			console.log("an error:"+ error);
  		},
  		()=>{
  			console.log("completed");
  		}
  	)
  }

  ngOnDestroy(){
  	this.numberSubscription.unsubscribe();
  	this.customSubscription.unsubscribe();
  }

}
