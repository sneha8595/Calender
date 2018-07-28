import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToDoHomePageComponent } from './to-do-home-page/to-do-home-page.component';

const routes: Routes = [
    { path: '', redirectTo: '/todohomepage', pathMatch: 'full' },
    { path: 'todohomepage', component: ToDoHomePageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
	
}