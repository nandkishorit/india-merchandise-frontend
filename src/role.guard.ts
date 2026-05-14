import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles: string[] = route.data['roles'];  
    const token = this.authService.getToken();
    const decoded: any= this.authService.decodeToken();
    let userRoles: string[] = [];

    if (decoded && decoded.result && decoded.result.length > 0) {
      const roles: string = decoded.result[0].roles; 
      console.log('roles------',roles);
      userRoles = roles.split(','); 
      console.log('split------',userRoles);
       console.log('expexcted------',expectedRoles);
     if (expectedRoles && !expectedRoles.some(r => userRoles.includes(r))) {
        console.log('123------');
        this.router.navigate(['/unauthorized']); 
        return false;
      }
       console.log('456------');
    }
    return true;
  }
}
