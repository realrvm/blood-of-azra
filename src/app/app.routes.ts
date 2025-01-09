import type { Routes } from '@angular/router'
import { PATHS } from '@azra/core'
import { HomeComponent } from '@azra/pages'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: PATHS.home,
    component: HomeComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@azra/layout').then((m) => m.LayoutComponent),
      },
      {
        path: '',
        loadComponent: () =>
          import('@azra/layout').then((m) => m.HeaderComponent),
        outlet: 'header',
      },
      {
        path: '',
        loadComponent: () =>
          import('@azra/drawers').then((m) => m.AboutsDrawerComponent),
        outlet: 'abouts-drawer',
      },
      {
        path: '',
        loadComponent: () =>
          import('@azra/drawers').then((m) => m.ContactsDrawerComponent),
        outlet: 'contacts-drawer',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
]
