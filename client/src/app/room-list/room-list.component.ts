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
	newRoomName: string;
	password: string;
	joinPass: string;
	wrongpass = false;


	constructor(private chatService: ChatService,
		private router: Router) { }

	ngOnInit() {
		this.chatService.getRoomList().subscribe(lst => {
			this.rooms = lst;
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

	attemptToConnectTo(id: string) {
		this.chatService.connectToRoom(id, this.joinPass).subscribe(info => {
			if (info['success'] === true) {
				this.wrongpass = false;
				this.chatService.addToRoomPassMap(id, this.joinPass);
				this.router.navigateByUrl('/rooms/' + id);
			} else {
				this.wrongpass = true;
			}
		});

		/*
		this.chatService.roomIsLocked(id).subscribe(succeeded => {
			if (succeeded === true) {

			}
		});*/
	}
}
