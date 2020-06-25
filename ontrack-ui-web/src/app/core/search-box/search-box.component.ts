import {Component, OnInit} from '@angular/core';
import {SearchResultType, SearchService} from "../../service/search.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

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

  searchForm: FormGroup;

  constructor(private searchService: SearchService, private formBuilder: FormBuilder) {
    this.searchForm = formBuilder.group(new SearchForm());
  }

  ngOnInit(): void {
    this.searchService.loadSearchResultTypes().subscribe(types => this.searchResultTypes = types);
  }

  selectSearchResultType(type: SearchResultType) {
    this.selectedSearchResultType = type;
  }

  selectAllSearchResultTypes() {
    this.selectedSearchResultType = this.searchService.defaultResultType;
  }

  submitSearch() {
    const data: SearchForm = Object.assign({}, this.searchForm.value);
    const token = data.token
    const type = this.selectedSearchResultType.id
    // TODO Go to the search page with the token & type
  }
}

class SearchForm {
  token: string = '';
}
