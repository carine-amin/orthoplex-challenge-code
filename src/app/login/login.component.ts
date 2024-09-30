import {Component, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PanelModule} from "primeng/panel";
import {InputTextModule} from "primeng/inputtext";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {Button, ButtonDirective} from "primeng/button";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PanelModule,
    InputTextModule,
    CardModule,
    Button,
    ButtonDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService ) {}
  loginForm: FormGroup = new FormGroup({
    'username': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  });

  hideError = true;

  get username() {
    return this.loginForm.get('username')?.value;
  }
  get password() {
    return this.loginForm.get('password')?.value;
  }

  onSubmit() {
    if (this.authService.login(this.username, this.password)) {
      this.hideError = true;
      this.router.navigate(['/dashboard']);
    } else {
      this.hideError = false;
    }
  }
}
