import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	ngOnInit(){
		firebase.initializeApp({
			apiKey: "AIzaSyBiTL4AObQeKeqPDLP-ibd7n1282GXXhc8",
    		authDomain: "ng-recipe-book-5849b.firebaseapp.com",
		});
	}
}
