import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/home/cart/cart.page').then((m) => m.CartPage),
      },
      {
        path: 'gifts/:id',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/home/item-detail/item-detail.page').then(
                (m) => m.ItemDetailPage
              ),
          },
          {
            path: 'cart',
            loadComponent: () =>
              import('./pages/home/cart/cart.page').then((m) => m.CartPage),
          },
        ],
      },
    ],
    canMatch: [async () => await inject(AuthService).authGuard()],
  },
  {
    path: 'login',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./pages/login/signup/signup.page').then((m) => m.SignupPage),
      },
    ],
  },
];
