import { Directive, OnInit, HostListener,HostBinding } from '@angular/core';

@Directive({
	selector:'[appDropdown]'

})
export class DropdownDirective implements OnInit{
	@HostBinding('class.open') isOpen = false;

	@HostListener('click') toggleOpen (eventData: Event){
		this.isOpen = !this.isOpen;
	}

	constructor(){

	}

	ngOnInit(){

	}
}