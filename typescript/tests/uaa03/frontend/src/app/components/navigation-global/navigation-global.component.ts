import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { NgIf } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navigation-global',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf,
  ],
  templateUrl: './navigation-global.component.html',
  styleUrl: './navigation-global.component.css',
})
export class NavigationGlobalComponent implements OnInit
{
  connectedRole?: string | null;

  constructor(
    private router: Router,
    private loginService: LoginService,
  )
  {
  }

  ngOnInit(): void
  {
    this.connectedRole = window.localStorage.getItem("role");

    if (window.localStorage.getItem("id")) {
      return;
    }

    this.loginService.connectedUser().subscribe((connectedUser) => {
      this.connectedRole = connectedUser?.role;

      if (connectedUser) {
        window.localStorage.setItem("id", connectedUser.id);
        window.localStorage.setItem("role", connectedUser.role);
      } else if (connectedUser === null) {
        window.localStorage.removeItem("id");
        window.localStorage.removeItem("role");
        this.connectedRole = null;
      }
    });
  }

  disconnect(evt: Event)
  {
    evt.preventDefault();
    this.loginService.logout();
    this.router.navigate(["/"]);
    this.connectedRole = null;
  }

  get imgSource(): string
  {
    if (this.connectedRole === 'admin') {
      return 'https://static.vecteezy.com/system/resources/thumbnails/019/194/935/small_2x/global-admin-icon-color-outline-vector.jpg';
    }

    if (this.connectedRole === 'medecin') {
      return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHGk3gWiGe1JJc0Puh7RdiJg93M7-YjTddWg&s';
    }

    if (this.connectedRole === 'patient') {
      return 'https://static.vecteezy.com/ti/vecteur-libre/p1/5944649-infirmier-et-son-patient-vectoriel.jpg';
    }

    return "";
  }
}
