import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const routeUrl: string = state.url;
    return this.isLogin(routeUrl);
  }

  isLogin(routeUrl: string) {
    if (this.auth.isLoggedIn()) {
      return true;
    }
    this.auth.redirectUrl = routeUrl;
    this.router.navigate(['/login'], { queryParams: { returnUrl: routeUrl } });
    return false;
  }
}
