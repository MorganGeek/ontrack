import {Component, OnInit} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: 'ot-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  loading: boolean;
  projects: [GetHomePageProject];

  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.apollo.query<GetHomePageResponse>({
      query: gql`
        query GetHomePage {
          projects {
            id
            name
          }
        }
      `,
    })
    .subscribe(result => {
      this.loading = result.loading;
      this.projects = result.data && result.data.projects;
    });
  }

}

type GetHomePageResponse = {
  projects: [GetHomePageProject];
}

// TODO Use the generated GraphQL types instead
type GetHomePageProject = {
  id: string;
  name: string;
}
