import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackageDetailsComponent } from './package-list/package-details/package-details.component';
import { PackageListComponent } from './package-list/package-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/package-list', pathMatch: 'full' },
  { path: 'package-list', component: PackageListComponent },
  { path: 'package-details/:id', component: PackageDetailsComponent },
  { path: '**', redirectTo: '/package-list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
