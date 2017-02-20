import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatService {
	socket: any;
	currentUser: string;
	password: string;
	PMs: {} = {};
	roomPassMap = [{}];
	foundRoom: boolean;


	constructor() {
		this.socket = io('http://localhost:8080/');
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

	roomIsLocked(id: string): Observable<boolean> {
		const obs = new Observable(observer => {
			this.socket.emit('rooms');
			this.socket.on('roomlist', (lst) => {
				let locked = false;
				for (const room in lst) {
					if (lst.hasOwnProperty(room)) {
						if (room === id) {
							locked = lst[room].locked;
						}
					}
				}
				observer.next(locked);
			});
		});
		return obs;
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

	addRoom(roomName: string, password: string): Observable<boolean> {
		// TODO: Validate that the room name is valid! (lol)
		this.password = password;
		const observable = new Observable(observer => {
			const param = {
				room: roomName,
				pass: password
			};
			this.roomPassMap.push(param);
			this.socket.emit('joinroom', param, function(a: boolean, b) {
				observer.next(a);
			});
		});
		return observable;
	}

	getPassByRoomId(id: string): string {
		for (const x in this.roomPassMap) {
			if (this.roomPassMap[x]['room'] === id) {
				return this.roomPassMap[x]['pass'];
			}
		}
		return undefined;
	}

	connectToRoom(roomId: string, pass: string): Observable<Object> {
		const obs = new Observable(observer => {
			let password: string;
			for (const x in this.roomPassMap) {
				if (this.roomPassMap[x]['room'] === roomId) {
					this.foundRoom = true;
					password = this.roomPassMap[x]['pass'];
				}
			}
			if (!this.foundRoom) {
				password = pass;
			}
			const param = {
				room: roomId,
				pass: password
			};
			this.socket.emit('joinroom', param, function(a: boolean, b) {
				const ret = {
					success: a,
					reason: b
				};
				observer.next(ret);
				console.log('connectToRoom returns: ' + a, ' if reason: ' + b);
			});
		});
		return obs;
	}

	addToRoomPassMap(id: string, pass: string) {
		let foundRoom = false;
		for (const x in this.roomPassMap) {
			if (this.roomPassMap[x]['room'] === id) {
				foundRoom = true;
				break;
			}
		}
		if (!foundRoom) {
			this.roomPassMap.push(
				{
					room: id,
					pass: pass
				}
			);
		}
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

	getKickedUsers(): Observable<Object> {
		const obs = new Observable(observer => {
			this.socket.on('kicked', (room, kickedUser, byop) => {
				const ret = {
					room: room,
					kickedUser: kickedUser,
					byOp: byop
				};
				observer.next(ret);
			});
		});
		return obs;
	}

	getBannedUsers(): Observable<Object> {
		const obs = new Observable(observer => {
			this.socket.on('banned', (room, bannedUser, byop) => {
				const ret = {
					room: room,
					bannedUser: bannedUser,
					byOp: byop
				};
				observer.next(ret);
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

	setPassword(room: string, password: string): Observable<boolean> {
		const obs = new Observable(observer => {
			const param = {
				room: room,
				password: password
			};
			this.socket.emit('setpassword', param, function(a: boolean) {
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

	banUser(room: string, user: string): Observable<boolean> {
		const obs = new Observable(observer => {
			const param = {
				room: room,
				user: user
			};
			this.socket.emit('ban', param, function(a: boolean) {
				observer.next(a);
			});
		});
		return obs;
	}

	getCurrentUser(): string {
		return this.currentUser;
	}

	getServerMessage(): Observable<string> {
		const obs = new Observable(observer => {
			this.socket.on('servermessage', (type, room, user) => {
				const ret = {
					type: type,
					room: room,
					user: user
				};
				observer.next(ret);
			});
		});
		return obs;
	}

	partRoom(room: string) {
		this.socket.emit('partroom', room);
	}

	getPrivateMsg(): Observable<string[]> {
		const obs = new Observable(observer => {
			this.socket.on('recv_privatemsg', (user, msg) => {
				const ret = {
					nick: user,
					message: msg
				};
			if (this.PMs[user] === undefined) {
				this.PMs[user] = { username: user, msg: []};
			}
			this.PMs[user].msg.push(ret);
			observer.next(ret);
			});
		});
		return obs;
	}

	sendPrivateMsg(user: string, msg: string): Observable<boolean> {
		const obs = new Observable(observer => {
			const param = {
				nick: user,
				message: msg
			};
			if (this.PMs[user] === undefined) {
				this.PMs[user] = { username: user, msg: []};
			}
			this.PMs[user].msg.push({nick: this.currentUser, message: msg});
			this.socket.emit('privatemsg', param, function(a: boolean) {
				observer.next(a);
			});
		});
		return obs;
	}

	getPmUsers(): string[] {
		const usrArr = [];
		for (const usr in this.PMs) {
			if (this.PMs.hasOwnProperty(usr)) {
				usrArr.push(usr);
			}
		}
		return usrArr;
	}

	getPmessagesFromUser(user: string): string[] {
		if ( this.PMs[user] !== undefined) {
			return this.PMs[user].msg;
		}
		return [];
	}

}
