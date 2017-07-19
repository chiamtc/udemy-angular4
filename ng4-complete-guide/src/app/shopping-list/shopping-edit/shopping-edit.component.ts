import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') shoppingListForm : NgForm;
  subscription:Subscription;
  editMode = false;
  editIndex :number;
  editItem :Ingredient;

  constructor(private shoppinglistService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppinglistService.startEditing.subscribe(
      (i:number)=>{
        this.editIndex = i;
        this.editMode = true;
        this.editItem = this.shoppinglistService.getIngredient(i);
        this.shoppingListForm.setValue({
          name: this.editItem.name,
          amount : this.editItem.amount
        })
      });
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onAddItem(form: NgForm){
    const value = form.value;
  	const ing = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppinglistService.updateIngredient(this.editIndex, ing);
    }else{
      this.shoppinglistService.addIngredient(ing);
    }
    this.shoppingListForm.reset();
    this.editMode = false;

  }

  onDelete(){
    this.onClear();
    this.shoppinglistService.deleteIngredient(this.editIndex);
  }

  onClear(){
    this.shoppingListForm.reset();
    this.editMode = false;
  }
}

