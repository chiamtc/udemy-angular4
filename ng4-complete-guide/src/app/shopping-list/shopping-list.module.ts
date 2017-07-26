import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
@NgModule({
	declarations:[
		ShoppingListComponent,
		ShoppingEditComponent
	],
	imports:[
		CommonModule,
		FormsModule,
		ShoppingRoutingModule
	]

})
export class ShoppingListModule{
	
}