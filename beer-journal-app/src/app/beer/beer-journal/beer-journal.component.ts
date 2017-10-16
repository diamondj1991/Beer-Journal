import { Component, OnInit } from '@angular/core';
import { BeerService } from "../beer.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-beer-journal',
  templateUrl: './beer-journal.component.html',
  styleUrls: ['./beer-journal.component.css']
})
export class BeerJournalComponent implements OnInit {

  journal;
  entryUpdated: boolean = false;
  entryUpdatedSubscription: Subscription;

  constructor(private beerService: BeerService) { }

  ngOnInit() {
    this.journal = this.beerService.getBeersInJournalObservable();
    this.entryUpdatedSubscription = this.beerService.checkJournalUpdated.subscribe(
      (journalEntryUpdated: boolean) => {
        this.entryUpdated = journalEntryUpdated;
        setTimeout(() => {
          this.entryUpdated = false;
        }, 2500);
      }
    );
  }

  onUpdateJournalEntry(key, beer, note) {
    beer.notes = note;
    console.log(beer);
    this.beerService.onUpdateEntryInJournal(key, note);
  }

  onDeleteJournalEntry(key) {
    this.beerService.onDeleteEntryInJournal(key);
  }

}
