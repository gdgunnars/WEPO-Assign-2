import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';
import { GlobalEventManagerService } from './../global-event-manager.service';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	userName: string;
	loginFailed: boolean;
	noUserName = false;

	constructor(private chatService: ChatService,
		private router: Router,
		private globalEventManagerService: GlobalEventManagerService,
		private authService: AuthService) {

	}

	ngOnInit() {
		// here we can call functions in chatService:
		// this.chatService.someFunc()
	}

	onLogin() {
		if (this.userName === undefined || this.userName === '') {
			this.noUserName = true;
			this.loginFailed = false;
		} else {
			this.noUserName = false;
			this.chatService.login(this.userName).subscribe(succeeded => {
				this.loginFailed = !succeeded;
				if (succeeded === true) {
					this.authService.login();
					this.globalEventManagerService.showNavBar(true);
					this.router.navigate(['/rooms']);
				}
			});
		}
	}
}
