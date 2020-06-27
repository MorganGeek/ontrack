import {Component, OnInit} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {UiMenuAction, UiMenuUriAction, User} from "../../../types";

@Component({
  selector: 'ot-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  loading: boolean;
  userName: string;
  uiActions: Array<UiMenuAction>;

  menuBarVisible: boolean = false;

  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.apollo.query<{user: User}>({
      query: gql`
        query GetUser {
          user {
            account {
              fullName
            }
            uiMenuActions {
              id
              name
              description
              icon
              ... on UIMenuURIAction {
                uri
              }
              ... on UIMenuPageAction {
                page {
                  feature {
                    id
                  }
                  type
                  params {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      `,
    })
    .subscribe(result => {
      this.loading = result.loading;
      this.userName = result.data && result.data.user.account.fullName;
      this.uiActions = result.data && result.data.user.uiMenuActions;
    });
  }

  isUri(uiAction: UiMenuAction): uiAction is UiMenuUriAction {
    return !!(uiAction as UiMenuUriAction).uri;
  }

  getUri(uiAction: UiMenuUriAction): string {
    return (uiAction as UiMenuUriAction).uri;
  }

  toggleMenu(): void {
    this.menuBarVisible = !this.menuBarVisible;
  }

}
