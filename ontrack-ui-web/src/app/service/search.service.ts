import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  defaultResultType: SearchResultType = {
    feature: {
      id: ""
    },
    id: "",
    name: "Any",
    description: "Searching in all entities"
  };

  constructor(private apollo: Apollo) {
  }

  loadSearchResultTypes(): Observable<[SearchResultType]> {
    return this.apollo.query<GetSearchResultTypesPayload>({
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

// TODO Use generates types

type GetSearchResultTypesPayload = {
  searchResultTypes: [SearchResultType]
}

export type SearchResultType = {
  feature: SearchResultTypeFeature,
  id: string,
  name: string,
  description: string
}

export type SearchResultTypeFeature = {
  id: string
}
