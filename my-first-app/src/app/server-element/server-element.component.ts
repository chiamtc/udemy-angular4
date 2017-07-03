import { Component, OnInit, OnChanges, SimpleChanges ,Input,
   ViewEncapsulation, DoCheck, AfterContentInit,AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked,
AfterViewInit, AfterViewChecked, OnDestroy {
  //element below is a property for ServerElementComponent for html property
  //this element is only accessible for ServerElementComponent component but not others
  //therefore, you need a decorator to expose this property to the world (pretty much this is like OOP)
  //using Input decorator
  //e.g. this 'element' property will be used in html <app-server-element [element]="">..</app-server-element>
  @Input('srvElement') element:{type:string, name:string, content:string};
  @Input() name:string;

  //viewchild is like local reference (#) but viewchild accessible in TS whereas
  //local reference(#) only for HTML template
  @ViewChild('heading') header: ElementRef;
  constructor() {
    console.log("constructor called!");
  }

  ngOnChanges(changes: SimpleChanges){
    console.log("ngchanges called!");
    console.log(changes);
  }

  ngOnInit() {
    console.log("nginit called!");
    console.log("Text Content: " + this.header.nativeElement.textContent);
  }

  //anything on the webpage, docheck gets called, could be good for autosave to checkl connection and etc.
  ngDoCheck(){
    console.log("docheck called!");
  }

  ngAfterContentInit(){
    console.log("ngAftecontentinit called");
  }

  ngAfterContentChecked(){
    console.log("ngAftecontentcheck called");
  }

  ngAfterViewInit(){
    console.log("ngAfteViewinit called");
    console.log("Text Content: " + this.header.nativeElement.textContent);
  }


  ngAfterViewChecked(){
    console.log("ngAfteViewcheck called");
  }

  ngOnDestroy(){
    console.log("ngDestroy called");
  }
}
