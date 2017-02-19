import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { GlobalEventManagerService } from './../global-event-manager.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
	showNavBar = false;
	channels: string[];

	constructor(private chatService: ChatService,
		private globalEventManagerService: GlobalEventManagerService) {
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
			}
		});
	}
}
