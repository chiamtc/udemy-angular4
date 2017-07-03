import { Component, OnInit } from '@angular/core';

@Component({
  //selector: '[app-servers]',
  selector: '.app-servers',
  templateUrl: './servers.component.html' ,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = "No server is created";
  serverName ='Testserver';
  serverCreated = false;
  userName="";
  servers=['testservers', 'testservers2'];
  allowClick = false;

  toShow = false;
  toShowValue =1 ;
  toShowLists = [];
  constructor() {
    setTimeout(()=>{
        this.allowNewServer= true;
    },3000);
  }

  ngOnInit() {
  }

  onCreateServer(){
    this.serverCreated = true;
    this.serverCreationStatus="Server was created! Name is " + this.serverName;
    this.servers.push(this.serverName);
  }

  checkEmpty(){
    return this.userName === '' ? true :false;
  }

  resetForm(){
    this.userName ="";
  }

  updateServerName(event:Event){
    console.log(event);
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  displayDetails(){
    this.toShow = !this.toShow;
    this.toShowLists.push(this.toShowValue++);
    console.log(this.toShowLists);
  }

  setColor(number){
    if(number >= 5 ){
      return 'blue';
    }
  }
}
