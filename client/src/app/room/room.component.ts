import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: 'app-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

	roomId: string;
	roomTopic: string;
	newMessage: string;
	messageHistory: {}[];

	constructor(private router: Router,
		private chatService: ChatService,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.roomId = this.route.snapshot.params['id'];
		this.chatService.getRoom(this.roomId);
		this.chatService.getMessage().subscribe(messages => {
			if(messages["roomName"] === this.roomId){
				this.messageHistory = messages["msg"];
			}
		});
	}

	onSendMessage() {
		this.chatService.sendMsg(this.roomId, this.newMessage);
		this.newMessage = "";
	}



}
