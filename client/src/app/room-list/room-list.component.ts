import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-room-list',
	templateUrl: './room-list.component.html',
	styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

	rooms: string[];
	users: string[];
	newRoomName: string;
	password: string;
	newMessage: string;
	msgReceiver: string;

	constructor(private chatService: ChatService,
		private router: Router) { }

	ngOnInit() {
		this.chatService.getRoomList().subscribe(lst => {
			this.rooms = lst;
		});
		this.chatService.getUserList().subscribe( lst => {
			this.users = lst;
		});
		this.chatService.getServerMessage().subscribe(obj => {
			if (obj['type'] === 'quit') {
				const index = this.users.indexOf(obj['user']);
				this.users.splice(index, 1);
			}
		});
	}

	onNewRoom() {
		if (this.newRoomName.length < 1) {
			// TODO: Some error message
			return;
		}
		if (this.password === undefined || this.password === '') {
			this.password = undefined;
		}
		this.chatService.addRoom(this.newRoomName, this.password).subscribe(succeded => {
			if (succeded === true) {
				this.router.navigate(['rooms', this.newRoomName]);
			}
		});

	}
	sendPM(user: string) {
		this.chatService.sendPrivateMsg(user, this.newMessage).subscribe(succeeded => {
			if (succeeded){
				this.router.navigate(['user', user]);
			}
		});
	}
	setMsgReceiver(user: string) {
		this.msgReceiver = user;
	}
}
