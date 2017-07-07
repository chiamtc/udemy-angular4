import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
export class ShoppingListService{
	ingredientChanged = new EventEmitter<Ingredient []>();
	private ingredients: Ingredient[] = [
    new Ingredient('pepperonni', 6),
    new Ingredient('mozzarella', 10)

  ];

  getIngredient(){
  	return this.ingredients.slice();
  }

  addIngredient(ing:Ingredient){
  	 this.ingredients.push(ing);
  	 this.ingredientChanged.emit(this.ingredients.slice());
  }

  addIngredients(ing:Ingredient[]){
  	for(let eachIng of ing){
  		this.addIngredient(eachIng);
  	}
  }
}