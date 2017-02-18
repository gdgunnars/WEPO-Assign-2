import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    userName: string;
    loginFailed: boolean = false;

    constructor(private chatService: ChatService, private router: Router) {

    }

    ngOnInit() {
		// here we can call functions in chatService:
		// this.chatService.someFunc()
    }

    onLogin() {
        console.log('Login called in component');
        this.chatService.login(this.userName).subscribe(succeeded => {
            console.log('Succeess!!');
            this.loginFailed = !succeeded;
            if (succeeded === true) {
                this.router.navigate(['/rooms']);
            }
        });
    }
	/*
	this.socket.emit("adduser", this.userName, succeeded => {
		if (!succeeded) {
			this.loginFailed = true;
		}
		else {
			console.log("Login succeeded");
		}
	});*/
}
