import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'todo',
    loadComponent: () => import('./pages/todo/todo.page').then( m => m.TodoPage)
  },
  {
    path: 'details',
    loadComponent: () => import('./pages/details/details.page').then( m => m.DetailsPage)
  },
];
