import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in with correct credentials', () => {
    const result = service.login('admin', 'admin');
    expect(result).toBe(true);
    service.isLoggedIn$.subscribe(isLoggedIn => {
      expect(isLoggedIn).toBe(true);
    });
  });

  it('should not log in with incorrect credentials', () => {
    const result = service.login('wrongUser', 'wrongPass');
    expect(result).toBe(false);
    service.isLoggedIn$.subscribe(isLoggedIn => {
      expect(isLoggedIn).toBe(false);
    });
  });

  it('should log out', () => {
    service.login('admin', 'admin');
    expect(service.isLoggedIn$).toBeTruthy();
    service.logout();
    service.isLoggedIn$.subscribe(isLoggedIn => {
      expect(isLoggedIn).toBe(false);
    });
  });
});
