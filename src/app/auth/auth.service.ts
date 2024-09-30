import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInSubject.asObservable();

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.loggedInSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedInSubject.next(false); // Update state to logged out
  }
}
