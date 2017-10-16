import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-breweries-nearby',
  templateUrl: './breweries-nearby.component.html',
  styleUrls: ['./breweries-nearby.component.css']
})
export class BreweriesNearbyComponent implements OnInit {

  title: string = 'Breweries Within 30 Miles!';
  lat: number = 51.678418;
  lng: number = 7.809007;
  labelOptions = {
    color: 'white',
    text: 'S',
  };
  breweries: Brewery[] = [];

  constructor(private http: Http) { }

  ngOnInit() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat =  position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log(this.lat, this.lng);
      }, (error) => {
        alert(error.message);
      });
    }

    this.http.get('https://thingproxy.freeboard.io/fetch/https://maps.googleapis.com/maps/api/place/nearbysearch/json?' +
      'location=42.337935099999,' +
      '-71.1524883&radius=50000' +
      '&keyword=brewery' +
      '&key=AIzaSyCs1qsqDmtipDQDQlhwqcN5QnwLaE9gUVA')
      .map(
        (response: Response) => {
        const data = response.json();
        return data;
      })
      .subscribe(
        (searchResults: any) => {
          console.log(searchResults.results)
          for (let brewery of searchResults.results) {
            let breweryObj = {
              lat: brewery.geometry.location.lat,
              lng: brewery.geometry.location.lng,
              name: brewery.name
            };
            this.breweries.push(breweryObj);
          }
          //console.log(this.breweries)
        }
      );

  }

  // use this URL to return JSON of breweries within 50000 meters (see https://developers.google.com/places/web-service/search#PlaceSearchRequests)
  // URL: https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=42.337935099999,-71.1524883&radius=50000&keyword=brewery&key=AIzaSyCs1qsqDmtipDQDQlhwqcN5QnwLaE9gUVA
  // With this info we can make a bunch of markers with the metadata of the breweries

}

interface Brewery {
  lat: number
  lng: number
  name: string
}
