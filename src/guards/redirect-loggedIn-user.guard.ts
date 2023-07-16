import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/services/localStorage.service';

@Injectable({
  providedIn: 'root',
})
export class RedirectLoggedInUserGuard implements CanActivate {
  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthenticated = this.localStorage.isAuthenticated();
    if (isAuthenticated) {
      this.router.navigate(['']);
      return false;
    } else {
      return true;
    }
  }
}
