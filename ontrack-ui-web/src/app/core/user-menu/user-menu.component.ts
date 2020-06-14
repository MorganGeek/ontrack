import {Component, OnInit} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: 'ot-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.less']
})
export class UserMenuComponent implements OnInit {

  loading: boolean;
  userName: string;
  uiActions: [UserMenuUIAction];

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
