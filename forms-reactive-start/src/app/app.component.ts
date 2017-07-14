import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormArray } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm : FormGroup;

  ngOnInit(){
  	//signupForm is a formgroup and only need key:value pair
  	//all the binds found in the html
  	this.signupForm = new FormGroup({
  		'userData':new FormGroup({
  			'username': new FormControl(null, Validators.required),
  			'email': new FormControl(null, [Validators.required, Validators.email])
  		}),
  		'gender':new FormControl('male'),
  		'hobbies': new FormArray([])

  	});
  }

  onSubmit(){
  	console.log(this.signupForm);
  }

  onAddHobby(){
  	const control = new FormControl(null, Validators.required);
  	(<FormArray>this.signupForm.get('hobbies')).push(control);
  }
}
