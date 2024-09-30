import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";

class MockAuthService {
  login(username: string, password: string): boolean {
    return username === 'admin' && password === 'admin';
  }
}

class MockRouter {
  navigate(path: string[]) {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.controls['username']).toBeTruthy();
    expect(component.loginForm.controls['password']).toBeTruthy();
  });

  it('should validate form controls', () => {
    const usernameControl = component.loginForm.controls['username'];
    const passwordControl = component.loginForm.controls['password'];

    usernameControl.setValue('');
    passwordControl.setValue('');

    expect(usernameControl.valid).toBeFalsy();
    expect(passwordControl.valid).toBeFalsy();
  });

  it('should submit the form successfully', () => {
    component.loginForm.setValue({ username: 'admin', password: 'admin' });

    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.onSubmit();

    expect(component.hideError).toBeTrue();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should show error on login failure', () => {
    component.loginForm.setValue({ username: 'wrong', password: 'credentials' });

    component.onSubmit();

    expect(component.hideError).toBeFalse();
  });
});
