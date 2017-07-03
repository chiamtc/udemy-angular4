/* This is a server component to be included as a nest in app component.

 @xxxx = Decorator typescript feature which enhances the class/elements
 to use decorator, you might have to import it
*/

import { Component } from '@angular/core';


@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls:['./server.component.css']
})

export class ServerComponent{
  serverId : number = 10;
  serverStatus : string = "offline";
  constructor(){
    this.serverStatus= Math.random() > 0.5? 'online' : 'offline';

  }
  getServerStatus(){
    return this.serverStatus;
  }

  getColor(){
    return this.serverStatus=== 'online'? 'green' : 'red';
  }
}
