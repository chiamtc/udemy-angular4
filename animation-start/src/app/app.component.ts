import { Component } from '@angular/core';
import { trigger, state, style,transition, animate } from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations:[
  	trigger('divState',[
  		state('normal',style({
  			'background-color': 'red',
  			transform: 'translateX(0)'

  		})),
  		state('highlighted',style({
  			'background-color': 'blue',
  			transform:'translateX(100px)'
  		})),
  		transition('normal <=> highlighted', animate(300))

  		// transition('highlighted => normal', animate(800))
  	]),
  	trigger('wildState',[
  		state('normal',style({
  			'background-color': 'red',
  			transform: 'translateX(0) scale(1)'

  		})),
  		state('highlighted',style({
  			'background-color': 'blue',
  			transform:'translateX(100px) scale(1)'
  		})),
  		state('shrunken',style({
  			'background-color': 'green',
  			transform:'translateX(100px) scale(0.5)'
  		})),
  		transition('normal => highlighted', animate(300)),
  		transition('highlighted => normal', animate(800)),
  		transition('shrunken <=> *',[
  			//starting phase of being shrunken
	  		style({
	  			'background-color' :'orange'
	  		}),
	  		//in between animation changes
	  		animate(500,style({
	  			borderRadius:'50px'
	  		})),
	  		//to avoid ul;gy jump at the end straightaway
	  		animate(500)
	  		]//end of array
  		)//end of third transition

  	]),
  	trigger('list1',[
  		state('in',style({
  			opacity : 1,
  			transform: 'translateX(0)'

  		})),
  		//each lkist comes in transition
  		transition('void => *', [
  			//starting animation
  			style({
	  			opacity:0,
	  			transform: 'translateX(-100px)'
  			}),
  			//animate it
  			animate(300)
  		]),
  		//each list goes oout transition
  		transition('* => void', [
  			animate(300, style({
  				transform: 'translateX(100px)',
  				opacity: 0
  			}))
  		])// end of 2nd transition
  	]),
  ]// end of animations
})
export class AppComponent {
	state='normal';
	wildState = 'normal';
	list = ['Milk', 'Sugar', 'Bread'];

	onAdd(item) {
		this.list.push(item);
	}

	onDelete(item) {
		this.list.splice(this.list.indexOf(item), 1);
	}

	onAnimate(){
		this.state =='normal' ? this.state='highlighted': this.state='normal';
		this.wildState == 'normal' ? this.wildState='highlighted': this.wildState='normal';
	}

	onShrink(){
		this.wildState = 'shrunken';
	}
}
