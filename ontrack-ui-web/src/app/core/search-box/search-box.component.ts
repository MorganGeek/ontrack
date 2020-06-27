import {Component, OnInit} from '@angular/core';
import {SearchService} from "../../service/search.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {SearchResultType} from "../../../types";

@Component({
  selector: 'ot-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  boxId: string;
  boxClass: string = "form-inline";

  searchResultTypes: Array<SearchResultType>;
  selectedSearchResultType: SearchResultType = this.searchService.defaultResultType

  searchForm: FormGroup;

  constructor(
    private searchService: SearchService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
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
    // Go to the search page with the token & type
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(["/search"], {
      queryParams: {
        type: type,
        token: token
      }
    });
  }
}

class SearchForm {
  token: string = '';
}
