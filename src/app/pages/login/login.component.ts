import {Component} from "@angular/core";
import {FormsModule} from "@angular/forms";

@Component({
    selector:"app-login",
    templateUrl:"./login.component.html",
    styleUrl:"./login.component.css",
    imports:[FormsModule],
    standalone:true
})
export class LoginComponent{
    username="";
    password="";

    onSubmit(){
        console.log("username", this.username, "password", this.password);
    }
}