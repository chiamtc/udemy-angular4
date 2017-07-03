import { Directive, Renderer2, 
	OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{
  @Input() defaultColor:string = "transparent";
  @Input() highlightColor:string = "blue";

  // hostbinding(<which property of hosting element to bind>) <just a property : datatype> ="<value>"
  @HostBinding('style.backgroundColor') backgroundColor:string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(){
  	this.backgroundColor = this.defaultColor;
  	// this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');

  }

  @HostListener('mouseenter') mouseover(eventData: Event){
  	// for rednerer
  	// this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');

  	//for hostbinding
  	this.backgroundColor = this.highlightColor;
  }

  //@HostLiterner( '<the real event>') the_event_function_name_yougive(parameter for callback)
  // real event can refer to mdn https://developer.mozilla.org/en-US/docs/Web/Events
   @HostListener('mouseleave') mouseleave(eventData: Event){
  	// this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');

  	this.backgroundColor = this.defaultColor;
  }

}
