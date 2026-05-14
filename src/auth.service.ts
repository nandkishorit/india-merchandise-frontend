import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ApiEndPoints } from '../src/app/api-endpoints';
import { DecodedToken, TokenStorage } from './token-storage';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public localStorage?: Storage;
  private authStatus = new BehaviorSubject<boolean>(this.isLoggedIn());
 
  authStatus$ = this.authStatus.asObservable();
  private role: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorage = window.localStorage;
       console.log('localStorage-----',this.localStorage);
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    console.log('token--1--', token);
    if (!token) return false;
    try {
      const decoded: any = jwtDecode(token); // ✅
      const now = Date.now() / 1000;
      return typeof decoded?.exp === 'number' && decoded.exp > now;
    } catch {
      return false;
    }
  }

  decodeToken(): DecodedToken | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode<DecodedToken>(token); // ✅
    } catch {
      return null;
    }
  }

  setRole(role: string) {
    this.role = role;
    localStorage.setItem('role', role);
  }
  // getRole(): string | null {
  //   return this.role || localStorage.getItem('role');
  // }

  getToken(): string | null {
    return TokenStorage.get();
  }
  
  getRole(): string | null {
    const token = this.getToken();
    console.log('token-----------', token);
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.roles || null;
    } catch {
      return null;
    }
  }

  get roles(): any {
    return TokenStorage.decode()?.roles || [];
  }

  loginSuccess(token: string) {
    TokenStorage.set(token);
    this.authStatus.next(true);
  }

  logout(): void {
    TokenStorage.clear();
    this.authStatus.next(false);
    this.router.navigate(['/login']);
  }

  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(ApiEndPoints.loginCredential, data);
  }

  getRoleByEmail(email: string): Observable<{ role: string }> {
    return this.http.post<{ role: string }>(ApiEndPoints.getRoleByEmail, {
      email,
    });
  }
  getUser() {
    if (this.localStorage) {
      const user = this.localStorage.getItem('user');
      console.log('us-----', user);
      return user ? user : null;
    } else {
      return null;
    }
  }
  getUserId() {
    if (this.localStorage) {
      const uId = this.localStorage.getItem('id');
      console.log('us-----', uId);
      return uId ? uId : null;
    } else {
      return null;
    }
  }
}
