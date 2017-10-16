import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from "./app-routing.module"
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FlashMessagesModule } from "angular2-flash-messages";
import { environment } from '../environments/environment';
import { AgmCoreModule } from "@agm/core";

import { AppComponent } from './app.component';
import { BeerComponent } from './beer/beer.component';
import { HeaderComponent } from './header/header.component';
import { BeerSearchComponent } from './beer/beer-search/beer-search.component';
import { BeerDetailComponent } from './beer/beer-detail/beer-detail.component';
import { BeerItemComponent } from './beer/beer-search/beer-item/beer-item.component';
import { BeerStartComponent } from './beer/beer-start/beer-start.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BeerJournalComponent } from './beer/beer-journal/beer-journal.component';
import { BreweriesNearbyComponent } from './breweries-nearby/breweries-nearby.component';

import { BeerService } from "./beer/beer.service";


@NgModule({
  declarations: [
    AppComponent,
    BeerComponent,
    HeaderComponent,
    BeerSearchComponent,
    BeerDetailComponent,
    BeerItemComponent,
    BeerStartComponent,
    HomePageComponent,
    BeerJournalComponent,
    BreweriesNearbyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    FlashMessagesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCs1qsqDmtipDQDQlhwqcN5QnwLaE9gUVA',
    })

  ],
  providers: [BeerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
