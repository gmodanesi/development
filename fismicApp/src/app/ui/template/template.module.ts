import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';


import { HeaderComponent } from './header/header.component';
import { TemplateComponent } from './template.component';

const routes: Routes = [
  /*{
    path: '/template',
    //component: TemplateComponent,
    redirectTo: 'my-files', pathMatch: 'full'
  },*/
  { path: 'my-files', loadChildren: '../../pages/my-files/my-files.module#MyFilesPageModule'/*, outlet: 'navbar'*/ }
 
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TemplateComponent, HeaderComponent],
  exports: [TemplateComponent, HeaderComponent]
})
export class FismicTemplateModule {}