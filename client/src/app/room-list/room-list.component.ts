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
        this.chatService.addRoom(this.newRoomName).subscribe(succeded => {
            if (succeded === true) {
                this.router.navigate(['rooms', this.newRoomName]);
            }
        });
    }
}
