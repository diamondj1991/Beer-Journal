import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Subject} from "rxjs/Subject";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from "rxjs/Observable";
import { FlashMessagesService } from "angular2-flash-messages";

@Injectable()
export class BeerService {

  beerList = [];
  searchResults = false;
  checkSearchResults = new Subject<boolean>();
  beerListChanged = new Subject<any[]>();
  beersInJournal: FirebaseListObservable<any[]>;
  journalUpdated = false;
  checkJournalUpdated = new Subject<boolean>();
  addedToJournal = false;
  checkAddedToJournal = new Subject<boolean>();

  user: Observable<firebase.User>;
  userId: string;
  email: string;


  constructor(private http: Http, private database: AngularFireDatabase, public afAuth: AngularFireAuth,
              private flashMessage: FlashMessagesService) {
    //this.beersInJournal = database.list('/journal');
    this.user = this.afAuth.authState;
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.email = user.email;
        this.beersInJournal = database.list(`/journal/${this.userId}`);
        //console.log(user.uid);
        //console.log("user id: " + this.userId);
        //console.log("user email: " + this.email);
      }
    });

  }

  getBeerList() {
    return this.beerList;
  }

  onSearchAPI(query: string) {
    if (this.beerList.length !== 0) {
      this.onClearAPI();
    }
    const encodedQuery = encodeURI(query);
    this.http.get('https://thingproxy.freeboard.io/fetch/https://api.brewerydb.com/v2/search?' +
      'q=' + encodedQuery + '&' +
      'key=1bb5f30c23145237b1046c14bb55bff6&' +
      'type=beer&' +
      'withBreweries=Y&' +
      'format=jsonp')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
      .subscribe(
        (searchResults: any) => {
          if (searchResults.data) {
            for (let item of searchResults.data) {
              this.beerList.push(item);
            }
            this.searchResults = true;
            this.onCheckSearchResults();
          } else {
            this.searchResults = false;
            this.onCheckSearchResults();
          }
        }
      );
  }

  onCheckSearchResults() {
    this.checkSearchResults.next(this.searchResults);
  }

  onClearAPI() {
    this.beerList = [];
    this.beerListChanged.next(this.beerList);
  }

  onFindByIdAPI(beerId: string) {

    return this.http.get('https://thingproxy.freeboard.io/fetch/https://api.brewerydb.com/v2/beer/' +
      beerId + '?' +
      'key=1bb5f30c23145237b1046c14bb55bff6&' +
      'withBreweries=Y&' +
      'format=json')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      );
  }

  getBeersInJournalObservable() {
    return this.beersInJournal;
  }

  onAddToBeerJournal(beerObject) {
    this.beersInJournal.push(beerObject);
    this.addedToJournal = true;
    this.checkAddedToJournal.next(this.addedToJournal);
  }

  onUpdateEntryInJournal(key: string, newNotes: string) {
    this.beersInJournal.update(key, {notes: newNotes});
    this.journalUpdated = true;
    this.checkJournalUpdated.next(this.journalUpdated);
  }

  onDeleteEntryInJournal(key: string) {
    this.beersInJournal.remove(key);
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    this.flashMessage.show('You are logged out', {cssClass: 'alert-success', timeout: 3000});
  }

}
