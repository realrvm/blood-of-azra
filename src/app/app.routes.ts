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
    ],
  },
  {
    path: '**',
    title: 'Not Found',
    loadComponent: () => import('@azra/pages').then((m) => m.NotFoundComponent),
  },
]
