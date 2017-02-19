import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatService {
	socket: any;
	currentUser: string;


	constructor() {
		this.socket = io('http://localhost:8080/');
		// this.socket = io ('http://192.168.0.137:8080/');
		this.socket.on('connect', function() {
			console.log('connect');
		});
	}

	login(userName: string): Observable<boolean> {
		const observable = new Observable(observer => {
			this.socket.emit('adduser', userName, succeeded => {
				console.log('Reply received');
				this.currentUser = userName;
				observer.next(succeeded);
			});
		});

		return observable;
	}

	getRoomList(): Observable<string[]> {
		const obs = new Observable(observer => {
			this.socket.emit('rooms');
			this.socket.on('roomlist', (lst) => {
				const strArr: string[] = [];
				for (const x in lst) {
					if (lst.hasOwnProperty(x)) {
						strArr.push(x);
					}
				}
				observer.next(strArr);
			});
		});

		return obs;
	}

	getUserList(): Observable<string[]> {
		const obs = new Observable(observer => {
			this.socket.emit('users');
			this.socket.on('userlist', (lst) => {
				const strArr: string[] = [];
				// console.log(lst);
				for (const x in lst) {
					if (lst.hasOwnProperty(x)) {
						strArr.push(lst[x]);
					}
				}
				observer.next(strArr);
			});
		});
		return obs;
	}

	addRoom(roomName: string): Observable<boolean> {
		// TODO: Validate that the room name is valid! (lol)
		const observable = new Observable(observer => {
			const param = {
				room: roomName
			};
			this.socket.emit('joinroom', param, function(a: boolean, b) {
				observer.next(a);
			});
			this.getChannelsForCurrentUser();
		});
		return observable;
	}

	connectToRoom(roomId: string) {
		const param = {
			room: roomId
		};
		this.socket.emit('joinroom', param, function(a: boolean, b) {
			console.log('connectToRoom returns: ' + a);
		});

	}

	sendMsg(roomId: string, msg: string) {
		console.log('sending msg to server');
		const param = {
			roomName: roomId,
			msg: msg
		};
		this.socket.emit('sendmsg', param);
	}

	getMessage(): Observable<Object> {
		const obs = new Observable(observer => {
			this.socket.on('updatechat', (roomName, historyList) => {
				observer.next({
					roomName: roomName,
					msg: historyList
				});
			});
		});

		return obs;
	}

	getUsers(): Observable<Object> {
		const obs = new Observable(observer => {
			this.socket.on('updateusers', (roomName, roomUsers, roomOps) => {
				const ret = {
					roomId: roomName,
					users: roomUsers,
					ops: roomOps
				};
				observer.next(ret);
			});
		});
		return obs;
	}

	getTopic(): Observable<string> {
		const obs = new Observable(observer => {
			this.socket.on('updatetopic', (room, topic, userName) => {
				const ret = {
					roomName: room,
					topic: topic,
					user: userName
				};
				observer.next(ret);
			});
		});
		return obs;
	}

	getChannelsForCurrentUser(): Observable<string[]> {
		const obs = new Observable(observer => {
			this.socket.on('channellist', (lst) => {
				const strArr: string[] = [];
				for (const x in lst) {
					if (lst.hasOwnProperty(x)) {
						strArr.push(lst[x]);
					}
				}
				observer.next(strArr);
			});
		});
		return obs;
	}

	setTopic(room: string, topic: string): Observable<boolean> {
		const obs = new Observable(observer => {
			const param = {
				room: room,
				topic: topic
			};
			this.socket.emit('settopic', param, function(a: boolean) {
				observer.next(a);
			});
		});
		return obs;
	}

	setOp(room: string, user: string): Observable<boolean> {
		const obs = new Observable(observer => {
			const param = {
				room: room,
				user: user
			};
			this.socket.emit('op', param, function(a: boolean) {
				observer.next(a);
			});
		});
		return obs;
	}

	deOp(room: string, user: string): Observable<boolean> {
		const obs = new Observable(observer => {
			const param = {
				room: room,
				user: user
			};
			this.socket.emit('deop', param, function(a: boolean) {
				observer.next(a);
			});
		});
		return obs;
	}

	kickUser(room: string, user: string): Observable<boolean> {
		const obs = new Observable(observer => {
			const param = {
				room: room,
				user: user
			};
			this.socket.emit('kick', param, function(a: boolean) {
				observer.next(a);
			});
		});
		return obs;
	}
}
