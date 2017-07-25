import { Component} from '@angular/core';
import { Response } from '@angular/http';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
@Component({
  selector:'app-header',
  templateUrl: './header.component.html',
  styleUrls:['./header.component.css']
})
export class HeaderComponent{
	constructor( private dsService: DataStorageService
		,private authService: AuthService){}
	onSave(){
		this.dsService.storeRecipes().subscribe(
			(response:Response) => {
				console.log(response);
			},
			(error:Response) => {

			}
		);
	}

	onLogout(){
		this.authService.logout();
	}
	onFetch(){
		this.dsService.getRecipes();
	}
}
