import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from '../chat.service';


@Component({
	selector: 'app-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.css'],
})


export class RoomComponent implements OnInit, AfterViewChecked {
	@ViewChild('scrollChat') private myChatScrollContainer: ElementRef;
	@ViewChild('scrollUsers') private myUserScrollContainer: ElementRef;
	@ViewChild('scrollOps') private myOpsScrollContainer: ElementRef;

	users: string[];
	ops: string[];
	roomId: string;
	roomTopic: string;
	newMessage: string;
	messageHistory: {}[];

	constructor(private router: Router,
		private chatService: ChatService,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.scrollToBottom();
		this.roomId = this.route.snapshot.params['id'];
		this.chatService.connectToRoom(this.roomId);
		this.chatService.getMessage().subscribe(messages => {
			if (messages['roomName'] === this.roomId) {
				this.messageHistory = messages['msg'];
			}
		});

		this.chatService.getUsers().subscribe(obj => {
			if (obj['roomId'] === this.roomId) {
				const usrArr: string[] = [];
				const opArr: string[] = [];
				for (const op in obj['ops']) {
					if (op !== undefined) {
						opArr.push(op);
					}

				}
				for (const user in obj['users']) {
					if (user !== undefined) {
						if (!opArr.some(x => x === user)) {
							usrArr.push(user);
						}
						this.users = usrArr;
						this.ops = opArr;
					}
				}
			}
		});
		this.scrollToBottom();
	}

	onSendMessage() {
		if (this.newMessage !== '') {
			this.chatService.sendMsg(this.roomId, this.newMessage);
			this.newMessage = '';
			this.scrollToBottom();
		}
	}

	ngAfterViewChecked() {
		this.scrollToBottom();
	}

	scrollToBottom(): void {
		try {
			this.myChatScrollContainer.nativeElement.scrollTop = this.myChatScrollContainer.nativeElement.scrollHeight;
			this.myUserScrollContainer.nativeElement.scrollTop = this.myUserScrollContainer.nativeElement.scrollHeight;
			this.myOpsScrollContainer.nativeElement.scrollTop = this.myOpsScrollContainer.nativeElement.scrollHeight;
		} catch (err) { }
	}

}
