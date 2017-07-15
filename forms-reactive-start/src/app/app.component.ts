import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm : FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(){
  	//signupForm is a formgroup and only need key:value pair
  	//all the binds found in the html
  	this.signupForm = new FormGroup({
  		'userData':new FormGroup({
  			'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
  			'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
  		}),
  		'gender':new FormControl('male'),
  		'hobbies': new FormArray([])

  	});
  	// to listen the valuechanges and statuschanges of the form
  	/*this.signupForm.valueChanges.subscribe(
  		(value) => console.log(value);
  	);

  	this.signupForm.statusChanges.subscribe(
		(status) => console.log(status);
  	);*/

  	this.signupForm.setValue({
  		'userData':{
  			'username':'Kappa',
  			'email':'kappa@test.com'
  		},
  		'gender':'male',
  		'hobbies':[]
  	});
  }

  onSubmit(){
  	console.log(this.signupForm);
  	this.signupForm.reset();
  }

  onAddHobby(){
  	const control = new FormControl(null, Validators.required);
  	(<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control:FormControl):{[s:string]:boolean}{
  	if(this.forbiddenUsernames.indexOf(control.value) !== -1){
  		return {'nameIsForbidden':true};
  	}
  	return null;
  }

  forbiddenEmails(control:FormControl) :Promise<any> | Observable<any>{
  	const promise = new Promise<any>( (resolve,reject)=>{
  		setTimeout(()=>{
  			if(control.value === 'test@test.com'){
  				resolve({'emailIsForbidden':true});
  			}else{
  				resolve(null);
  			}
  		},1500);
  	});
  	return promise;
  }
}
