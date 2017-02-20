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

		console.log('Login called in component');
		this.chatService.login(this.userName).subscribe(succeeded => {
			console.log('Succeess!!');
			this.loginFailed = !succeeded;
			if (succeeded === true) {
				this.authService.login();
				// this.globalEventsManager.showNavBar(true);
				this.globalEventManagerService.showNavBar(true);
				this.router.navigate(['/rooms']);
			}
		});
	}
}
