# OntrackUiWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.8.

## Apollo Angular GraphQL

### JS GraphQL helper in IntelliJ

To generate the Ontrack V4 JS GraphQL helper for IntelliJ, see the file at `./.graphqlconfig`.

* Start the application (possibly on an empty database)
* Run the configuration from the `./.graphqlconfig` file
* This generates a `ontrack-v4.graphql` file at the root of the workspace

### Typescript types

Copy the `ontrack-v4.graphql` file generated previously into `ontrack-ui-web`.

Run:

```bash
npm run generate
```

This generates the `ontrack-ui-web/src/types.d.ts` file, which must be under version control.

### Apollo fragments

To generate the Apollo fragment files:

```bash
npm run fragments
``` 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component --skip-import --prefix ot <component>` to generate a new component.

You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --prefix ot`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
