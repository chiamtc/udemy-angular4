import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  /* styles:[`h3{color:lightblue;}`]*/
})
export class AppComponent {
  serverElements=[{type:'server',name:'TEstserver',content:'just a test'}];
  oddNumbers =[];
  evenNumbers = [];
  onServerAdded(serverData:{serverName:string, serverContent:string}){
    this.serverElements.push({
      type:'server',
      name:serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData:{serverName:string, serverContent:string}){
    this.serverElements.push({
      type:'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }

  onChangeFirst(){
    this.serverElements[0].name ="changed!";
  }

  onDestroyFirst(){
    this.serverElements.splice(0,1);
  }

  onTimeFire(fireNumber:number){
    //console.log(fireNumber);
    if(fireNumber % 2 ==0){
      this.oddNumbers.push(fireNumber);
    }else{
      this.evenNumbers.push(fireNumber);
    }
  }

  onTimeClear(clearNumber:number){
    console.log(clearNumber);
  }
}
