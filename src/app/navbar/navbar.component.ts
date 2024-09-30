import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {AuthService} from "../auth/auth.service";
import {MenubarModule} from "primeng/menubar";
import {Subscription} from "rxjs";
import {Ripple} from "primeng/ripple";
import {Button, ButtonDirective} from "primeng/button";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    MenubarModule,
    Ripple,
    Button,
    ButtonDirective
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  private authSubscription!: Subscription;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
      this.authSubscription = this.authService.isLoggedIn$.subscribe(
        (isLoggedIn) => {
          this.isLoggedIn = isLoggedIn;
        }
      );
    }

    logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
    }

    ngOnDestroy() {
      this.authSubscription.unsubscribe();
  }
}
