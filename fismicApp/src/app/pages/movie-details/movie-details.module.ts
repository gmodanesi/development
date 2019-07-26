import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ButtonModule} from 'primeng/button';
import { Badge } from '@ionic-native/badge/ngx';



import { IonicModule } from '@ionic/angular';

import { MovieDetailsPage } from './movie-details.page';

const routes: Routes = [
  {
    path: '',
    component: MovieDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BreadcrumbModule,
    ButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MovieDetailsPage]
})
export class MovieDetailsPageModule {}
