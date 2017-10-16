import { Component, OnInit, ViewChild } from '@angular/core';
import { BeerService } from "../beer.service"
import { Subscription } from "rxjs/Subscription";
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beer-search',
  templateUrl: './beer-search.component.html',
  styleUrls: ['./beer-search.component.css']
})
export class BeerSearchComponent implements OnInit {

  constructor(private beerService: BeerService, private router: Router, private route: ActivatedRoute) {}

  beerList = [];
  searchResults = true;
  beerListChangedSubscription: Subscription;
  searchResultSubscription: Subscription;
  @ViewChild('formReference') formObject: NgForm;

  ngOnInit() {
    this.beerService.onClearAPI();
    this.beerList = this.beerService.getBeerList();
    this.beerListChangedSubscription = this.beerService.beerListChanged.subscribe(
      (beerList: any[]) => {
        this.beerList = beerList;
      }
    );
    this.searchResultSubscription = this.beerService.checkSearchResults.subscribe(
      (searchReturnsResults: boolean) => {
        this.searchResults = searchReturnsResults;
      }
    );

  }

  search(query: string) {
    this.beerService.onSearchAPI(query);
    //console.log(this.beerList)
  }

  clear() {
    this.formObject.reset();
    this.router.navigate(['/beer']);
    this.beerService.onClearAPI();
  }

}
