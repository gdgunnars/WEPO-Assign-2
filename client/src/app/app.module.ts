import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CollapseDirective } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/modal';
import { ButtonsModule } from 'ng2-bootstrap/buttons';
import { TooltipModule } from 'ng2-bootstrap/tooltip';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomComponent } from './room/room.component';
import { ChatService } from './chat.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { GlobalEventManagerService } from './global-event-manager.service';
import { AuthGuard } from './authguard.service';
import { AuthService } from './auth.service';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RoomListComponent,
		RoomComponent,
		NavBarComponent,
		CollapseDirective
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot([{
			path: '',
			redirectTo: 'login',
			pathMatch: 'full'
		}, {
			path: 'login',
			component: LoginComponent
		}, {
			path: 'rooms',
			component: RoomListComponent,
			canActivate: [AuthGuard]
		}, {
			path: 'rooms/:id',
			component: RoomComponent,
			canActivate: [AuthGuard]
		}]),
		ModalModule.forRoot(),
		ButtonsModule.forRoot(),
		TooltipModule.forRoot()
	],
	providers: [ChatService, GlobalEventManagerService, AuthService, AuthGuard],
	bootstrap: [AppComponent]
})

export class AppModule { }
