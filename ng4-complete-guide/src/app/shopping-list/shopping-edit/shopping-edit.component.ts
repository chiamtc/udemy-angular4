import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameRef : ElementRef;
  @ViewChild('amountInput') amountRef : ElementRef;
  @Output() addedIngredient = new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit() {
  }

  onAddItem(){
  	const ingName = this.nameRef.nativeElement.value;
  	const ingAmt = this.amountRef.nativeElement.value;
  	const ing = new Ingredient(ingName, ingAmt);
  	this.addedIngredient.emit(ing);
  }
}

