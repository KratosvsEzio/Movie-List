import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, } from '@angular/material';

const routes: Routes = [
  {
    path: '', children: [
      { path: ':imdbID', component: MoviePageComponent },
    ]
  }
];
@NgModule({
  declarations: [MoviePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule,
  ],
  exports: [RouterModule]
})
export class MoviePageModule { }
