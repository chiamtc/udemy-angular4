import { Injectable,OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{
  constructor(private slService: ShoppingListService ){

  }
  recipesChange = new Subject<Recipe[]>();
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


  getRecipes(){
  	return this.recipes.slice();
  }

  getRecipe(id:number){
    return this.recipes[id];
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.slService.addIngredients(recipe.ingredients);
    this.recipesChange.next(this.recipes.slice());
  }

  updateRecipe(index:number, newRecipe:Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChange.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChange.next(this.recipes.slice());

    

  }
}