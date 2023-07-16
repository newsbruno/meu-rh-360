import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guards/auth.guard';
import { RedirectLoggedInUserGuard } from 'src/guards/redirect-loggedIn-user.guard';
import { DashboardComponent } from 'src/pages/dashboard/dashboard.component';
import { JobsComponent } from 'src/pages/jobs/jobs.component';
import { MyCompanyComponent } from 'src/pages/my-company/my-company.component';
import { PageNotFoundComponent } from 'src/pages/page-not-found/page-not-found.component';
import { ProfileComponent } from 'src/pages/profile/profile.component';
import { RegisterComponent } from 'src/pages/register/register.component';
import { UsersComponent } from 'src/pages/users/users.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'company',
        pathMatch: 'full',
      },
      {
        path: 'company',
        data: {
          label: 'Empresa',
          icon: ['fas', 'building'],
          requiresRegister: false,
        },
        children: [
          {
            path: '',
            redirectTo: 'company-config',
            pathMatch: 'full',
          },
          {
            path: 'company-config',
            data: {
              label: 'Config. da empresa',
              icon: ['fas', 'cog'],
              requiresRegister: false,
            },
            children: [
              {
                path: '',
                data: {
                  label: 'Minha empresa',
                  icon: ['fas', 'home'],
                  requiresRegister: false,
                },
                outlet: 'dashboard',
                component: MyCompanyComponent,
              },
            ],
          },
          {
            path: 'sys-config',
            canActivate: [AuthGuard],
            data: {
              label: 'Config. da sistema',
              icon: ['fas', 'cogs'],
              requiresRegister: true,
            },
            children: [],
          },
        ],
      },
      {
        path: 'jobs',
        data: {
          label: 'Vagas',
          icon: ['fas', 'briefcase'],
          requiresRegister: true,
        },
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: 'jobs-admin',
            pathMatch: 'full',
            outlet: 'dashboard',
          },
          {
            path: 'jobs-admin',
            data: {
              label: 'Gestão de vagas',
              icon: ['fas', 'clipboard-list'],
              requiresRegister: true,
            },
            outlet: 'dashboard',
            component: JobsComponent,
          },
        ],
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        data: {
          label: 'Usuários',
          icon: ['fas', 'users'],
          requiresRegister: true,
        },
        children: [
          {
            path: '',
            redirectTo: 'profile',
            pathMatch: 'full',
            outlet: 'dashboard',
          },
          {
            path: 'profile',
            data: {
              label: 'Meu Perfil',
              icon: ['fas', 'user-circle'],
              requiresRegister: true,
            },
            outlet: 'dashboard',
            component: ProfileComponent,
          },
          {
            path: 'all-users',
            data: {
              label: 'Todos os usuários',
              icon: ['fas', 'user-friends'],
              requiresRegister: true,
            },
            outlet: 'dashboard',
            component: UsersComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RedirectLoggedInUserGuard],
    data: { requiresRegister: false },
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { requiresRegister: false },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
