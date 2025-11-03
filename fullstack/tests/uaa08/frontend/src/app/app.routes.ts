import { Routes } from '@angular/router';

import { adminOnlyGuard } from '~/guards/admin-only.guard';
import { anonymousOnlyGuard } from '~/guards/anonymous-only.guard';
import { isAuthenticatedFullyGuard } from '~/guards/authenticated.guard';
import { isProprietaireRoleGuard } from '~/guards/proprietaire-only.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: async () => {
      const { HomeComponent: c } = await import('./pages/home/home.component');
      return c;
    },
  },

  {
    path: 'register',
    canActivate: [anonymousOnlyGuard],
    loadComponent: async () => {
      const { RegisterComponent: c } = await import('~/pages/auth/register/register.component');
      return c;
    },
  },

  {
    path: 'login',
    loadComponent: async () => {
      const { LoginComponent: c } = await import('~/pages/auth/login/login.component');
      return c;
    },
  },
  {
    path: 'reset-password',
    loadComponent: async () => {
      const { ResetPasswordComponent: c } = await import('~/pages/auth/reset-password/reset-password.component');
      return c;
    },
  },

  {
    path: 'account',
    canActivate: [isAuthenticatedFullyGuard],
    loadComponent: async () => {
      const { AccountComponent: c } = await import('./pages/account/account.component');
      return c;
    },
  },

  {
    path: 'contact-us',
    loadComponent: async () => {
      const { ContactUsComponent: c } = await import('./pages/contact-us/contact-us.component');
      return c;
    },
  },

  {
    path: 'annonces',
    loadComponent: async () => {
      const { ListingAnnonceComponent: c } = await import('./pages/annonce/listing/listing-annonce.component');
      return c;
    },
  },
  {
    path: 'annonce/new',
    canActivate: [isAuthenticatedFullyGuard],
    loadComponent: async () => {
      const { CreateAnnonceComponent: c } = await import('./pages/annonce/create/create-annonce.component');
      return c;
    },
  },
  {
    path: 'annonce/edit/:id',
    canActivate: [isAuthenticatedFullyGuard, isProprietaireRoleGuard],
    loadComponent: async () => {
      const { CreateAnnonceComponent: c } = await import('./pages/annonce/create/create-annonce.component');
      return c;
    },
  },
  {
    path: 'annonce/:id',
    loadComponent: async () => {
      const { DetailsAnnonceComponent: c } = await import('./pages/annonce/details/details-annonce.component');
      return c;
    },
  },

  {
    path: 'admin',
    canActivate: [adminOnlyGuard],
    loadComponent: async () => {
      const { AdminLayoutComponent: c } = await import('./layouts/admin-layout/admin-layout.component');
      return c;
    },
    children: [
      {
        path: '',
        loadComponent: async () => {
          const { AdminDashboardComponent: c } = await import('./pages/admin/dashboard/admin-dashboard.component');
          return c;
        }
      },

      {
        path: 'contact-messages',
        loadComponent: async () => {
          const { AdminContactMessagesListingComponent: c } = await import('./pages/admin/contact-messages/listing/admin-contact-messages-listing.component');
          return c;
        },
      },
      {
        path: 'contact-messages/:id',
        loadComponent: async () => {
          const { AdminContactMessagesShowComponent: c } = await import('./pages/admin/contact-messages/show/admin-contact-messages-show.component');
          return c;
        },
      },

      {
        path: 'users',
        loadComponent: async () => {
          const { AdminListingUserComponent: c } = await import('./pages/admin/users/listing/listing-user.component');
          return c;
        },
      },
      {
        path: 'users/edit/:id',
        loadComponent: async () => {
          const { EditUserComponent: c } = await import('./pages/admin/users/edit/edit-user.component');
          return c;
        },
      },
    ],
  },

  {
    path: '**',
    loadComponent: async () => {
      const { NotFoundComponent: c } = await import('./pages/not-found/not-found.component');
      return c;
    },
  }
];
