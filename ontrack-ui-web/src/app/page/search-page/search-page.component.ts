import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: 'ot-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  token: string;
  type: string;
  loading: boolean = true;

  page: Page = {
    offset: 0,
    size: 10
  };

  constructor(private route: ActivatedRoute, private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.type = params.type;
      this.token = params.token;
      this.launchSearch();
    });
  }

  launchSearch() {
    this.loading = true;
    this.apollo.query({
      query: gql`
        query Search($token: String!, $type: String, $offset: Int!, $size: Int!) {
          search(token: $token, type: $type, offset: $offset, size: $size) {
            pageInfo {
              nextPage {
                offset
                size
              }
            }
            pageItems {
              title
              description
              accuracy
              uiPage {
                type
                params {
                  name
                  value
                }
                feature {
                  id
                }
              }
              type {
                id
                name
                feature {
                  id
                }
              }
            }
          }
        }
      `,
      variables: {
        token: this.token,
        type: this.type,
        offset: this.page.offset,
        size: this.page.size,
      }
    }).subscribe(result => {
      this.loading = false;
    });
  }

}

// TODO Use common types

type Page = {
  offset: number,
  size: number
}
