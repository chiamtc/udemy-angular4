import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	@ViewChild('f') signupForm : NgForm;
  	@ViewChild('username') usernameChild : NgModel;
  	defaultQuestion='pet';
  	comment = "";
  	genders=['male', 'female'];
  	user={
  		username:'',
  		email:'',
  		secretQuestion:'',
  		comment:'',
  		gender:''
  	}
  	submitted=false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    //ngForm.setValue() found from angualrdoc
   /* this.signupForm.setValue({
    	userData:{
    		username: suggestedName,
    		email:''
    	},
    	secret: 'pet',
    	comment:'',
    	gender:'male'

    });*/

    //the signUpfrom from NgForm,
    //from official documentation, it has form has property
    //and form property is implemented from FormGroup
    //so you can search FormGroup clas in the doc to find the method+property
    this.signupForm.form.patchValue({
    	userData:{
    		username:suggestedName
    	}

    });
  }

  
 /* onSubmit(form : NgForm){
  	console.log(form); 
  	console.log(form.value.username);
  	//get the ngForm local reference with a bunch of properties
  	//in console, one of them is values which tied to "name" in html element
  }*/

  onSubmit(){
  	this.submitted=true;
  	console.log(this.signupForm);
  	console.log(this.comment);
  	console.log(this.usernameChild.value);
  	this.user.username= this.signupForm.value.userData.username;
  	this.user.email= this.signupForm.value.userData.email;
  	this.user.secretQuestion= this.signupForm.value.secret;
  	this.user.comment = this.signupForm.value.comment;
  	this.user.gender = this.signupForm.value.gender;
  	this.signupForm.reset();
  }
}
