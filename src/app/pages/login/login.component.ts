import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { JsonPipe } from "@angular/common";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css"
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {

    this.loginForm = this.fb.group({

      email: [
        "",
        [
          Validators.required,
          Validators.email
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

  onSubmit() {
    if (this.loginForm.invalid) {
        this.loginForm.markAllAsTouched();
        return;
    }
    console.log(this.loginForm.value);

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