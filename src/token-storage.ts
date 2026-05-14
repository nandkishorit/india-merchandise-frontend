// // token-storage.ts
// import { jwtDecode } from 'jwt-decode';

// //const jwtDecode = require("jwt-decode");

// export interface DecodedToken {
//   length: number;
//   result: DecodedToken | null;
//   sub: string;
//   email: string;
//   roles?: string[];
//   exp: number;
// }

// export class TokenStorage {
//   private static KEY = 'token';

//   static set(token: string) {
//     console.log('setToken-----',token);
//     localStorage.setItem(this.KEY, token);
//   }

//   static get(): string | null {
//     return localStorage.getItem(this.KEY);
//   }

//   static clear() {
//     console.log("TokenStorage.clear() called ✅");  // 👈 Debug
//     localStorage.removeItem(this.KEY);        // sirf token delete hoga
//     console.log("After clear, token is:", localStorage.getItem(this.KEY));
//     //localStorage.removeItem(this.KEY);
//   }

//   static decode(): DecodedToken | null {
//     const token = this.get();
//     if (!token) return null;
//     try {
//       return jwtDecode<DecodedToken>(token);
//     } catch {
//       return null;
//     }
//   }

//   static isExpired(): boolean {
//     const exp = this.decode()?.exp;
//     return !exp || Date.now() >= exp * 1000;
//   }
// }

import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  sub: string;
  email: string;
  roles?: string[] | string;   
  exp: number;
  iat?: number;
  result?: any;               
}

export class TokenStorage {
  private static KEY = 'token';
  private static hasLocalStorage(): boolean {
    try {
      return typeof window !== 'undefined' && !!window.localStorage;
    } catch {
      return false;
    }
  }

  static set(token: string) {
    if (!this.hasLocalStorage()) return;
    console.log('setToken-----', token);
    localStorage.setItem(this.KEY, token);
  }

  static get(): string | null {
    if (!this.hasLocalStorage()) return null;
    return localStorage.getItem(this.KEY);
  }

  static clear() {
    if (!this.hasLocalStorage()) return;
    console.log("TokenStorage.clear() called ✅");  
    localStorage.removeItem(this.KEY);
    console.log("After clear, token is:", localStorage.getItem(this.KEY));
  }

  static decode(): DecodedToken | null {
    const token = this.get();
    if (!token) return null;
    try {
      return jwtDecode<DecodedToken>(token);
    } catch {
      return null;
    }
  }

  static isExpired(): boolean {
    const exp = this.decode()?.exp;
    return !exp || Date.now() >= exp * 1000;
  }
}

