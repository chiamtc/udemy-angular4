import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
export class ShoppingListService{
	ingredientChanged = new Subject<Ingredient []>();
  startEditing = new Subject<number>();
	private ingredients: Ingredient[] = [
    new Ingredient('pepperonni', 6),
    new Ingredient('mozzarella', 10)

  ];

  getIngredients(){
  	return this.ingredients.slice();
  }

  getIngredient(index:number){
    return this.ingredients[index];
  }

  addIngredient(ing:Ingredient){
  	 this.ingredients.push(ing);
  	 this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ing:Ingredient[]){
  	for(let eachIng of ing){
  		this.addIngredient(eachIng);
  	}
  }

  deleteIngredient(i:number){
    this.ingredients.splice(i,1);
    this.ingredientChanged.next(this.ingredients.slice());

  }

  updateIngredient(i:number, newIngredient: Ingredient){
    this.ingredients[i] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }
}