import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  {path:'', component: MainComponent},
  {path:'detail/:id/:chain', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
