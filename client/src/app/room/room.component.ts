import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ChatService } from '../chat.service';

@Component({
	selector: 'app-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.css'],
})


export class RoomComponent implements OnInit, AfterViewChecked {
	@ViewChild('scrollMe') private myScrollContainer: ElementRef;

	users: string[];
	roomId: string;

	constructor(private router: Router,
		private route: ActivatedRoute,
		private chatService: ChatService) { }

	ngOnInit() {
		this.roomId = this.route.snapshot.params['id'];
		this.scrollToBottom();
		this.chatService.getUserList().subscribe(lst => {
            this.users = lst;
        });
	}

	ngAfterViewChecked() {
		this.scrollToBottom();
	}

	scrollToBottom(): void {
		try {
			this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
		} catch(err) { }
	}
}
