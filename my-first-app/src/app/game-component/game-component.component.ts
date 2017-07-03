import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-component',
  templateUrl: './game-component.component.html',
  styleUrls: ['./game-component.component.css']
})
export class GameComponentComponent implements OnInit {
  time;
  @Output() timeFired = new EventEmitter<number>();
  lastNumber =0;
  constructor() { }

  ngOnInit() {
  }

  onStartTime(){
    this.time = setInterval(()=> {
      this.timeFired.emit(this.lastNumber +1);
      this.lastNumber++;
    },1000);
  }

  onStopTime(){
    clearInterval(this.time);

  }
}
