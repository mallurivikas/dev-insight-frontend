import { Component } from "@angular/core";
import {FormBuilder,FormGroup,ReactiveFormsModule,Validators} from "@angular/forms";
import { JsonPipe } from "@angular/common";
import {HttpClient} from "@angular/common/http";
import { OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/auth.models';

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css"
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  
  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService) {

    this.loginForm = this.fb.group({

      username: [
        "",
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      password: [
        "",
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]

    });

  }

loadPosts() {

    this.http.get(
        `https://jsonplaceholder.typicode.com/posts/`
    ).subscribe({

next:(response)=>{

console.log("Success");
console.log(response);

},

error:(err)=>{

console.log("Error");
console.log(err);

},

complete:()=>{

console.log("Request Finished");

}

});

}

onSubmit() {

  if(this.loginForm.invalid){
    this.loginForm.markAllAsTouched();
    return;
  }

  this.authService.login(this.loginForm.value as LoginRequest)
    .subscribe({

      next:(response)=>{

        console.log("SUCCESS");

        console.log(response);

      },

      error:(error)=>{

        console.log("ERROR");

        console.log(error);

      }

    });

}

  ngOnInit() {
        this.loadPosts();
    }

  hasError(controlName: string): boolean {

  const control = this.loginForm.get(controlName);

  return !!(control && control.touched && control.invalid);

}

getErrorMessage(controlName: string): string {

  const control = this.loginForm.get(controlName);

  if (!control?.errors)
    return "";

  if (control.errors['required'])
    return `${controlName} is required`;

  if (control.errors['email'])
    return "Please enter a valid email";

  if (control.errors['minlength'])
    return `Minimum length is ${control.errors['minlength'].requiredLength}`;

  return "Invalid input";

}
}