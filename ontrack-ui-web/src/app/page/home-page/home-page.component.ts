import {Component, OnInit} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {Project} from "../../../types";

@Component({
  selector: 'ot-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  loading: boolean;
  projects: Array<Project>;

  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.apollo.query<{projects: Array<Project>}>({
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
      this.projects = result.data.projects;
    });
  }

}
