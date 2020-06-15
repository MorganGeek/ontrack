import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Known pages
import {HomePageComponent} from "./page/home-page/home-page.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
