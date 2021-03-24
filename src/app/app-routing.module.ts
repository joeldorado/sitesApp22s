import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
const Routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    pathMatch: 'full'
  },
   {
    path: '404',
    loadChildren: () => import('./pages/page-404/page-404.module').then(m => m.Page404Module),
    pathMatch: 'full'
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./pages/members-area/members-area.module').then(m => m.MembersAreaModule),
    pathMatch: 'full',
  },
  {
    path: 'start',
    loadChildren: () => import('./pages/sales-page/sales-page.module').then(m => m.SalesPageModule),
    pathMatch: 'full',
  },
  {
    path: 'sendEmail',
    loadChildren: () => import('./pages/shared/email-sender/email-sender.module').then(m => m.EmailSenderModule),
    pathMatch: 'full',
  },
  {
    path: 'members',
    loadChildren: () => import('./pages/members-area/members-area.module').then(m => m.MembersAreaModule),
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    pathMatch: 'full',
  },
  {
    path: '**',
     loadChildren: () =>
     import('./pages/wildcard-handler/wildcard-handler.module').then(m => m.WildcardHandlerModule),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(Routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
