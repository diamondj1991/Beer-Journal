import {Component, Input, OnInit} from '@angular/core';
import { BeerService } from "../beer.service";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.css']
})
export class BeerDetailComponent implements OnInit {

  private id: string;
  beer = {
    beerName: '',
    brewery: '',
    category: '',
    abv: '',
    glassware: '',
    icon: '',
    description: '',
    notes: ''
  };
  addedToJournal: boolean = false;
  addedToJournalSubscription: Subscription;

  constructor(private beerService: BeerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.beerService.onFindByIdAPI(this.id)
            .subscribe(
            (searchResults: any) => {
              //console.log(searchResults)
              this.beerInit(searchResults.data);
            }
          );
        }
      );
    this.addedToJournalSubscription = this.beerService.checkAddedToJournal.subscribe(
      (beerAddedToJournal: boolean) => {
        this.addedToJournal = beerAddedToJournal;
        setTimeout(() => {
          this.addedToJournal = false;
        }, 2500);
      }
    );
  }

  beerInit(beerObject) {

    this.beer.beerName = beerObject.name;
    this.beer.brewery = beerObject.breweries[0].name;

    if (beerObject.style.name) {
      this.beer.category = beerObject.style.name;
    } else {
      this.beer.category = "Sorry! This beer has no listed category on BreweryDB right now...";
    }

    if (beerObject.abv) {
      this.beer.abv = beerObject.abv;
    } else {
      this.beer.abv = "Sorry! This beer has no listed ABV on BreweryDB right now...";
    }

    if (beerObject.glass) {
      this.beer.glassware = beerObject.glass.name;
    } else {
      this.beer.glassware = "Sorry! This beer has no listed recommended glassware on BreweryDB right now...";
    }

    if (beerObject.labels) {
      this.beer.icon = beerObject.labels.large;
    } else {
      this.beer.icon = "https://cdn.dribbble.com/users/266686/screenshots/2740301/beer-icon-02.png";
    }

    if (beerObject.description) {
      this.beer.description = beerObject.description;
    } else {
      this.beer.description = "Sorry! This beer has no listed description on BreweryDB right now...";
    }

    this.beer.notes = "";

  }

  onAddToDatabase() {
    console.log(this.beer);
    this.beerService.onAddToBeerJournal(this.beer);
  }

}
