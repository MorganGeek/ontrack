import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Project} from "../../../types";

@Component({
  selector: 'ot-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  loading: boolean;
  project: Project;

  constructor(private route: ActivatedRoute, private apollo: Apollo) {
  }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.apollo.query<{ projects: Array<Project> }>({
      query: gql`
        query GetProject($id: Int!) {
          projects(id: $id) {
            id
            name
            annotatedDescription
          }
        }
      `,
      variables: {
        id: id
      },
    })
    .subscribe(result => {
      this.loading = result.loading;
      this.project = result.data.projects[0];
    });
  }

}
