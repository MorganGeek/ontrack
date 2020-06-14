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
          }
        }
      `,
    })
    .subscribe(result => {
      this.loading = result.loading;
      this.userName = result.data && result.data.user.account.fullName;
    });
  }

}

type UserMenuResponse = {
  user: UserMenuUser;
}

type UserMenuUser = {
  account: UserMenuAccount
};

type UserMenuAccount = {
  fullName: string;
}
