import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Utilisateur } from '~/models/user';
import { InitialsPipe } from '~/pipes/initials.pipe';
import { AuthService } from '~/services/auth.service';

@Component({
  selector: 'ui-header',
  imports: [
    NgOptimizedImage,
    RouterLink,
    InitialsPipe,
    NgClass,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit
{
  /**
   * Utilisateur connecté (ou non).
   */
  currentUser: Utilisateur | null = null;
  offcanvas: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  )
  {
  }

  /**
   *
   */
  get isAdmin(): boolean
  {
    return this.currentUser?.roles.includes('ROLE_ADMIN') ?? false;
  }

  ngOnInit(): void
  {
    this.authService.currentUser().subscribe((maybeUser) => {
      this.currentUser = maybeUser;
    });
  }

  /**
   * Déconnexion de l'utilisateur
   */
  logout(): void
  {
    this.authService.logout();
    this.router.navigate(['/login']).then(() => location.reload());
  }

  toggleMenu()
  {
    this.offcanvas = !this.offcanvas;
  }
}
