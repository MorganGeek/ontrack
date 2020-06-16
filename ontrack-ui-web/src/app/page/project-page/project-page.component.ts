import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";

@Component({
  selector: 'ot-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  loading: boolean;
  project: GetProjectProject;

  constructor(private route: ActivatedRoute, private apollo: Apollo) {
  }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.apollo.query<GetProjectResponse>({
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
      this.project = result.data && result.data.projects[0];
    });
  }

}

type GetProjectResponse = {
  projects: [GetProjectProject]
}

// TODO Use the generated GraphQL types instead
type GetProjectProject = {
  id: string;
  name: string;
  annotatedDescription: string;
}
