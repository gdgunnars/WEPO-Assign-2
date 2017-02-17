import { Injectable } from '@angular/core';
import * as io from "socket.io-client";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ChatService {
  socket : any;

  constructor() {
      this.socket = io ("http://localhost:8080/");
      this.socket.on("connect", function() {
            console.log("connect")
      });
  }

  login(userName: string) : Observable<boolean> {
      var observable = new Observable();
      this.socket.emit("adduser", userName, succeeded => {

      });
  }

}
