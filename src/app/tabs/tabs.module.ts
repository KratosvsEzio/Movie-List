import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TabsComponent } from './tabs/tabs.component';
import { MatTabsModule, MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule,
  MatProgressSpinnerModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListComponent } from './movies-list/movies-list.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: TabsComponent },
    ]
  }
];

@NgModule({
  declarations: [
    TabsComponent,
    MoviesListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class TabsModule { }
