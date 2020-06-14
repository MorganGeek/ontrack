import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
      __schema: {
        types: [
          {
            kind: "INTERFACE",
            name: "UIMenuAction",
            possibleTypes: [
              {
                name: "UIMenuPageAction"
              },
              {
                name: "UIMenuURIAction"
              }
            ]
          }
        ]
      }
    }
  }
);

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({
      uri: '/graphql',
      withCredentials: true
    }),
    cache: new InMemoryCache({fragmentMatcher}),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
}
