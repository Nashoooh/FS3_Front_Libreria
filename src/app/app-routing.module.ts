import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibroListComponent } from './components/libro-list/libro-list.component';
import { LibroFormComponent } from './components/libro-form/libro-form.component';
import { LibroDetailComponent } from './components/libro-detail/libro-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/libros', pathMatch: 'full' },
  { path: 'libros', component: LibroListComponent },
  { path: 'libro-form', component: LibroFormComponent },
  { path: 'libro-form/:id', component: LibroFormComponent },
  { path: 'libro-detail/:id', component: LibroDetailComponent },
  { path: '**', redirectTo: '/libros' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
