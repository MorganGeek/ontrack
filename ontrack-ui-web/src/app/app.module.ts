import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import {ToolbarComponent} from "./core/toolbar/toolbar.component";

import {UserMenuComponent} from "./core/user-menu/user-menu.component";
import {HomePageComponent} from "./page/home-page/home-page.component";

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    UserMenuComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
