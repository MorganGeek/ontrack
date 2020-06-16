import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ot-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  boxId: string;

  constructor() { }

  ngOnInit(): void {
  }

}
