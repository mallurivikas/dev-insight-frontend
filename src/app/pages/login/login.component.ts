import {Component} from "@angular/core";
import {ReactiveFormsModule, FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
    selector:"app-login",
    templateUrl:"./login.component.html",
    styleUrls:["./login.component.css"],
    imports:[ReactiveFormsModule],
    standalone:true
})

export class LoginComponent{
    
    LoginForm: FormGroup;

    constructor(private fb : FormBuilder) {
        this.LoginForm = this.fb.group({
            email:["",[Validators.required,Validators.email]],
            password:["",[Validators.required,Validators.minLength(6)]]
        });
    }

    onSubmit(){
        console.log(this.LoginForm.value);
    }
}