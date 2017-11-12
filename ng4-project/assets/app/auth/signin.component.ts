import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { User } from './user.model';
@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent {
    myForm: FormGroup;
    constructor(private authService: AuthService, private router:Router){}
    onSubmit() {
        this.authService.signin(new User(this.myForm.value.email, this.myForm.value.password))
        .subscribe(
            data=>{
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                this.router.navigate(['/']);
                //this.router.navigateByUrl('/');
            },
            error => console.log(error);
        );
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
}