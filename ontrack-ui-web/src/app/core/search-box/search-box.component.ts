import {Component, OnInit} from '@angular/core';
import {SearchResultType, SearchService} from "../../service/search.service";

@Component({
  selector: 'ot-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  boxId: string;
  boxClass: string = "form-inline";

  searchResultTypes: [SearchResultType]
  selectedSearchResultType: SearchResultType = this.searchService.defaultResultType

  constructor(private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.searchService.loadSearchResultTypes(it => this.searchResultTypes = it);
  }

  selectSearchResultType(type: SearchResultType) {
    this.selectedSearchResultType = type;
  }

  selectAllSearchResultTypes() {
    this.selectedSearchResultType = this.searchService.defaultResultType;
  }

}
