import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  loading: boolean;

  constructor(private apollo: Apollo) {
  }

  loadSearchResultTypes(
    callback: (searchResultTypes: [SearchResultType]) => void
  ): void {
    this.apollo.query<GetSearchResultTypesPayload>({
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
    .subscribe(result => {
      this.loading = result.loading;
      let searchResultTypes = result.data && result.data.searchResultTypes;
      callback(searchResultTypes);
    });
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
