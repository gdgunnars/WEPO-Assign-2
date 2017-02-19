import { Component, OnInit } from '@angular/core';
import { GlobalEventManagerService } from './../global-event-manager.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
    showNavBar: boolean = false;

    constructor(private globalEventManagerService: GlobalEventManagerService) {
          this.globalEventManagerService.showNavBarEmitter.subscribe((mode)=>{
              // mode will be null the first time it is created, so you need to igonore it when null
              if (mode !== null) {
                this.showNavBar = mode;
              }
          });
      }

  ngOnInit() {
  }


}
