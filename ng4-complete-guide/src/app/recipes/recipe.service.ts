import { EventEmitter } from "@angular/core";
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
export class RecipeService{
	private recipes: Recipe[] = [
    new Recipe('Pizza', 'Taste good!', 'https://cdn.modpizza.com/wp-content/uploads/2016/11/mod-pizza-maddy-default-e1479167621575.png', [
    		new Ingredient("Pepperoni", 3),
    		new Ingredient("Cheese", 4)

    	]),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',[
    		new Ingredient("buns", 2),
    		new Ingredient("meat", 4)
    	])
    ];

  recipeSelected = new EventEmitter<Recipe>();

  getRecipes(){
  	return this.recipes.slice();
  }

  getRecipe(id:number){
    return this.recipes[id];
  }
}