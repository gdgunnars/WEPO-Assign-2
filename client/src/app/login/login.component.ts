import { Component, OnInit } from '@angular/core';
import { ChatService } from "../chat.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName : string;
  loginFailed : boolean = false;

  constructor(private chatService : ChatService) {

  }

  ngOnInit() {
      // here we can call functions in chatService:
      // this.chatService.someFunc()
  }

  onLogin() {
      var result = this.chatService.login(this.userName);
      if (result === true) {

      }
      /*
      this.socket.emit("adduser", this.userName, succeeded => {
          if (!succeeded) {
              this.loginFailed = true;
          }
          else {
              console.log("Login succeeded");
          }
      });*/
  }

}
