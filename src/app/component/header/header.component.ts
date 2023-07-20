import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {map, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result: BreakpointState) => result.matches),
      shareReplay()
    );

  openBurgerMenu : boolean;

  constructor(private breakpointObserver: BreakpointObserver,
              private authService : AuthService) {
    this.openBurgerMenu = false;
  }

  changeBurgerMenu() {
    this.openBurgerMenu = !this.openBurgerMenu;
  }

  deconnexion() {
    this.changeBurgerMenu();
    this.authService.logout();
  }

  isConnected() {
    return this.authService.isAuthenticated();
  }

  isAdmin() {
    return this.isConnected() && this.authService.isAdmin();
  }

  isEmploye() {
    return this.isConnected() && this.authService.isEmploye();
  }
}
