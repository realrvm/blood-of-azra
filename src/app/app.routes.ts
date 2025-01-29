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
    title: 'TBOA',
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
    path: PATHS.content,
    title: 'TBOA',
    loadComponent: () => import('@azra/pages').then((m) => m.ContentComponent),
  },
  {
    path: PATHS.handset,
    title: 'TBOA',
    loadComponent: () => import('@azra/pages').then((m) => m.HandsetComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
]
