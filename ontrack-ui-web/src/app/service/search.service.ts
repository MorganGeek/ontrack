import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {SearchResultType} from "../../types";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  defaultResultType: SearchResultType = {
    feature: null,
    id: "",
    name: "Any",
    description: "Searching in all entities"
  };

  constructor(private apollo: Apollo) {
  }

  loadSearchResultTypes(): Observable<Array<SearchResultType>> {
    return this.apollo.query<{ searchResultTypes: Array<SearchResultType> }>({
      query: gql`
        query GetSearchResultTypes {
          searchResultTypes {
            feature {
              id
            }
            id
            name
            description
          }
        }
      `
    })
    .pipe(map(({data}) => data.searchResultTypes));
  }
}
