import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { banksListComponent } from './components/banks-list/banks-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'banks-list' },
  { path: 'banks-list', component: banksListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }