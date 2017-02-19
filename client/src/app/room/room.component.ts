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
		this.roomId = this.route.snapshot.params['id'];
		this.chatService.connectToRoom(this.roomId);
		this.chatService.getMessage().subscribe(messages => {
			if (messages['roomName'] === this.roomId) {
				this.messageHistory = messages['msg'];
			}
		});
		this.chatService.getUsers().subscribe( obj => {
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
		this.chatService.getTopic().subscribe( obj => {
			if(obj['roomName'] === this.roomId){
				this.roomTopic = obj['topic'];
			}
		});
		this.scrollToBottom();
	}

	onSendMessage() {

		if (this.newMessage !== '') {
			if(this.newMessage.substring(0,1) === "!"){
				this.commandParsing(this.newMessage);
			}
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

	commandParsing(msg: string) {
		if(this.newMessage.substring(0,6) === "!topic") {
			this.chatService.setTopic(this.roomId, this.newMessage.substring(6)).subscribe(succeded => {
				if(succeded === false) {
					console.log("You don't have any ops bro!!");
				}
			});
		} else if(this.newMessage.substring(0,3) === "!op") {
			if (this.users.some(x => x === this.newMessage.substring(4))) {
				this.chatService.setOp(this.roomId, this.newMessage.substring(4)).subscribe(succeded => {
					if(succeded === false) {
						console.log("You don't have any ops bro!!");
					}
				});
			}
		} else if(this.newMessage.substring(0,5) === "!deop") {
			if (this.ops.some(x => x === this.newMessage.substring(6))) {
				this.chatService.deOp(this.roomId, this.newMessage.substring(6)).subscribe(succeded => {
					if(succeded === false) {
						console.log("You don't have any ops bro!!");
					}
				});
			}
		} else if(this.newMessage.substring(0,5) === "!kick") {
			if(this.ops.some(x => x === this.newMessage.substring(6)) || this.users.some(x => x === this.newMessage.substring(6))) {
				this.chatService.kickUser(this.roomId, this.newMessage.substring(6)).subscribe(succeded => {
					if(succeded === false) {
						console.log("you do not have da ops man!");
					}
				});
			}
		}
	}

}
