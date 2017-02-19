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
			if(messages["roomName"] === this.roomId){
				this.messageHistory = messages["msg"];
			}
		});


		this.chatService.getUserList().subscribe(lst => {
            this.users = lst;
        });
	}

	onSendMessage() {
		this.chatService.sendMsg(this.roomId, this.newMessage);
		this.newMessage = "";
		this.scrollToBottom();
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
