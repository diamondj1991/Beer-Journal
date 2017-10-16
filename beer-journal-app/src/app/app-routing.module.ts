import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeerComponent } from "./beer/beer.component"
import { BeerDetailComponent } from "./beer/beer-detail/beer-detail.component";
import { BeerStartComponent } from "./beer/beer-start/beer-start.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { BeerJournalComponent } from "./beer/beer-journal/beer-journal.component";
import { BreweriesNearbyComponent } from "./breweries-nearby/breweries-nearby.component";

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'breweries-nearby', component: BreweriesNearbyComponent},
  { path: 'beer', component: BeerComponent, children: [
    { path: '', component: BeerStartComponent},
    { path: ':id', component: BeerDetailComponent},
  ] },
  { path: 'beer-journal', component: BeerJournalComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}


