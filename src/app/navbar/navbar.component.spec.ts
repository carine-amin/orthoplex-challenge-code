import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = {
      isLoggedIn$: of(false),
      logout: jasmine.createSpy('logout'),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to isLoggedIn$ on init', () => {
    spyOn(authServiceMock.isLoggedIn$, 'subscribe').and.callThrough();
    component.ngOnInit();
    expect(authServiceMock.isLoggedIn$.subscribe).toHaveBeenCalled();
  });

  it('should update isLoggedIn when authService emits a value', () => {
    authServiceMock.isLoggedIn$ = of(true);
    component.ngOnInit();
    expect(component.isLoggedIn).toBeTrue();

    authServiceMock.isLoggedIn$ = of(false);
    component.ngOnInit();
    expect(component.isLoggedIn).toBeFalse();
  });

  it('should call authService.logout and navigate to login on logout', () => {
    component.logout();
    expect(authServiceMock.logout).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should unsubscribe from authService on component destroy', () => {
    spyOn(component['authSubscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['authSubscription'].unsubscribe).toHaveBeenCalled();
  });
});
