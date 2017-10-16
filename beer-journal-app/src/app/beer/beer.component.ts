import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.css']
})
export class BeerComponent {

  name: string = '';

  constructor(private http: Http) {}

  onSearchAPI(search: string) {
    this.http.get('https://thingproxy.freeboard.io/fetch/https://api.brewerydb.com/v2/search?q=russian%20river&key=1bb5f30c23145237b1046c14bb55bff6&format=jsonp')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
      .subscribe(
        (data: any) => {
          console.log(data.data[0].name)
          this.name = data.data[0].name;
        }
      );
  }

}
