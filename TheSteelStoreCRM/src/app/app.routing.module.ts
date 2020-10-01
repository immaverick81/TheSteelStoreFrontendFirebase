import { CrmListModule } from './components/crm/crm-list/crm-list.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/gaurds/auth.gaurd';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { ErrorComponent } from './shared/error/error.component';

const appRoutes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('src/app/components/login/login.module').then(m => m.LoginModule)
    },
    {
      path: 'crm',
      loadChildren: () => import('src/app/components/crm/crm-login/crm-login.module').then(m => m.CrmLoginModule)
    },
    {
        path: 'register',
        loadChildren: () => import('src/app/components/register-user/register-user.module').then(m => m.RegisterUserModule)
    },
    {
        path: 'main',
        component: LayoutComponent,
        children: [{
            path: 'dashboard',
            loadChildren: () => import('src/app/components/dashboard/dashboard.module').then(m => m.DashboardModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'steel',
            loadChildren: () => import('src/app/components/steel/steel.module').then(m => m.SteelModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'aboutus',
            loadChildren: () => import('src/app/components/aboutus/aboutus.module').then(m => m.AboutUsModule),
            canActivate: [AuthGuard]
        },
        {
            path: 'contactus',
            loadChildren: () => import('src/app/components/contactus/contactus.module').then(m => m.ContactUsModule),
            canActivate: [AuthGuard]
        }]
    },
    {
      path: 'crm',
      component: LayoutComponent,
      children: [{
          path: 'dashboard',
          loadChildren: () => import('src/app/components/crm/crm-dashboard/crm-dashboard.module').then(m => m.CrmDashboardModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'crm-list',
        loadChildren: () => import('src/app/components/crm/crm-list/crm-list.module').then(m => m.CrmListModule),
        canActivate: [AuthGuard]
      }]
    },
    {
        path: 'error',
        component: ErrorComponent,
        // loadChildren: () => import('src/app/shared/error/error.module').then(m => m.ErrorModule)
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
