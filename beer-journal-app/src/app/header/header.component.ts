import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from "rxjs/Observable";
import { BeerService } from "../beer/beer.service"
//import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(public beerService: BeerService,  private router: Router, private route: ActivatedRoute) { }

  ngOnInit() { }

  loginUser() {
    this.beerService.login();
  }

  logoutUser() {
    this.beerService.logout();
    this.router.navigate(['/']);
  }

}
