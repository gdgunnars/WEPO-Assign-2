import { NgModule, Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RoomListComponent } from '../room-list/room-list.component';



@Component({
	selector: 'app-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.css'],
})

@NgModule({
  declarations: [ RoomListComponent ]
})

export class RoomComponent implements OnInit, AfterViewChecked {
	@ViewChild('scrollMe') private myScrollContainer: ElementRef;

	roomId: string;

	constructor(private router: Router,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.roomId = this.route.snapshot.params['id'];
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
