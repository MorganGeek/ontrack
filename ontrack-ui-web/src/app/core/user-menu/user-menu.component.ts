import {Component, OnInit} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: 'ot-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  loading: boolean;
  userName: string;
  uiActions: [UserMenuUIAction];

  menuBarVisible: boolean = false;

  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.apollo.query<UserMenuResponse>({
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
                page
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

  isUri(uiAction: UserMenuUIAction): uiAction is UserMenuUIURIAction {
    return !!(uiAction as UserMenuUIURIAction).uri;
  }

  getUri(uiAction: UserMenuUIAction): string {
    return (uiAction as UserMenuUIURIAction).uri;
  }

  toggleMenu(): void {
    this.menuBarVisible = !this.menuBarVisible;
  }

}

type UserMenuResponse = {
  user: UserMenuUser;
}

type UserMenuUser = {
  account: UserMenuAccount
  uiMenuActions: [UserMenuUIAction]
};

type UserMenuAccount = {
  fullName: string;
}

interface UserMenuUIAction {
  id: string;
  name: string;
  description: string;
  icon: String;
}

class UserMenuUIURIAction implements UserMenuUIAction {
  uri: string;
  description: string;
  icon: String;
  id: string;
  name: string;
}

class UserMenuUIPageAction implements UserMenuUIAction {
  page: string;
  description: string;
  icon: String;
  id: string;
  name: string;
}
