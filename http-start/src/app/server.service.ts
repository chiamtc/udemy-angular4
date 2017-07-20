import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ServerService{
	constructor(private http:Http){

	}

	storeServers(servers:any[]){
		return this.http.post('https://udemy-ng-http-9866d.firebaseio.com/server.json', servers);
	}

}
//https://udemy-ng-http-9866d.firebaseio.com/