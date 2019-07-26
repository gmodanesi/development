import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//import { TemplateComponent } from './ui/template/template.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //{ path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'movies', loadChildren: './pages/movies/movies.module#MoviesPageModule' },
  { path: 'moviesDetail', loadChildren: './pages/movie-details/movie-details.module#MovieDetailsPageModule' },
  //{ path: 'my-files', loadChildren: './pages/my-files/my-files.module#MyFilesPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' }
  //{path: 'my-template', component: TemplateComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes/*, { preloadingStrategy: PreloadAllModules }*/)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
