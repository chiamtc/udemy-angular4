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
  allowClick = false;
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

}
