import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	@ViewChild('scrollChat') private myChatScrollContainer: ElementRef;
	@ViewChild('scrollUsers') private myUserScrollContainer: ElementRef;
	@ViewChild('scrollOps') private myOpsScrollContainer: ElementRef;

	roomId: string;
	PmUsers: string[];
	messages: string[];
	newMessage: string;

	constructor(private router: Router,
		private chatService: ChatService,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.roomId = this.route.snapshot.params['id'];
		// Getting all current users that user has a pm history with
		this.PmUsers = this.chatService.getPmUsers();
		this.chatService.getPrivateMsg().subscribe(msg => {
			// updating PmUsers list with all current pm users
			this.PmUsers = this.chatService.getPmUsers();
		});
		this.messages = this.chatService.getPmessagesFromUser(this.roomId);
		// Fill message array with history from correct user
	}

	sendPM(user: string) {
		this.chatService.sendPrivateMsg(this.roomId, this.newMessage).subscribe(succeeded => {
			if (succeeded) {
				this.PmUsers = this.chatService.getPmUsers();
				this.messages = this.chatService.getPmessagesFromUser(this.roomId);
				this.newMessage = '';
			}
		});
	}

	goHome() {
		this.router.navigate(['rooms']);
	}

}
