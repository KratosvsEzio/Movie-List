import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: './tabs/tabs.module#TabsModule'},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'movie-page', loadChildren: './movie-page/movie-page.module#MoviePageModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
