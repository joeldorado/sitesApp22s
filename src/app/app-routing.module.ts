import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {MembersAreaComponent} from './pages/members-area/members-area.component';
const Routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'sitename',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: AppComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
        pathMatch: 'full'
      },
      {
      path: 'members',
      //loadChildren: () => import('./pages/members-area/members-area.module').then(m => m.MembersAreaModule),
      component: MembersAreaComponent,
      // pathMatch: 'full'
    },
    {
    path: 'start',
    loadChildren: () => import('./pages/sales-page/sales-page.module').then(m => m.SalesPageModule),
    pathMatch: 'full'
  }]
  }
];
console.log(Routes);
@NgModule({
  imports: [RouterModule.forRoot(Routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
