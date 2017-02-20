import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { GlobalEventManagerService } from './../global-event-manager.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
	showNavBar = false;
	channels: string[] = [];
	roomId: string;

	constructor(private chatService: ChatService,
		private globalEventManagerService: GlobalEventManagerService,
		private route: ActivatedRoute,
		private router: Router) {
		this.globalEventManagerService.showNavBarEmitter.subscribe((mode) => {
			// mode will be null the first time it is created, so you need to igonore it when
			if (mode !== null) {
				this.showNavBar = mode;
			}
		});
	}

	ngOnInit() {

		this.chatService.getChannelsForCurrentUser().subscribe(lst => {
			this.channels = lst;

		});
		this.chatService.getKickedUsers().subscribe(info => {
			if (info['kickedUser'] === this.chatService.getCurrentUser()) {
				if (this.channels.some(x => x === info['room'])) {
					const index = this.channels.indexOf(info['room']);
					this.channels.splice(index, 1);
				}
				this.router.navigateByUrl('/rooms');
			}
		});
		this.chatService.getBannedUsers().subscribe(info => {
			if (info['bannedUser'] === this.chatService.getCurrentUser()) {
				if (this.channels.some(x => x === info['room'])) {
					const index = this.channels.indexOf(info['room']);
					this.channels.splice(index, 1);
				}
				this.router.navigateByUrl('/rooms');
			}
		});
		this.chatService.getServerMessage().subscribe( info => {
			if ( info['type'] === 'part') {
				if (this.channels.some(x => x === info['room']) && info['user'] === this.chatService.getCurrentUser()) {
					const index = this.channels.indexOf(info['room']);
					this.channels.splice(index, 1);
				}
			}
		});
	}

	onActive(id: string) {
		if (this.router.navigated === false) {
			// Case when route was not used yet
			this.router.navigateByUrl('/rooms/' + id);
		} else {
			// Case when route was used once or more
			this.router.navigateByUrl('/').then(
				() => {
					this.router.navigateByUrl('rooms/' + id);
				}
			);
		}
	}
}
