import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-beer-item',
  templateUrl: './beer-item.component.html',
  styleUrls: ['./beer-item.component.css']
})
export class BeerItemComponent implements OnInit {

  @Input() beer;
  @Input() index;

  constructor() { }

  ngOnInit() {
  }

}
