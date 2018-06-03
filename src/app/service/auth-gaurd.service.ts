import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { observable} from 'rxjs';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {
  constructor( private authService: AuthService , private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   return this.authService.user$.pipe(
      map(user => {
        if (user) {return true; }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url}});
        return false;
      }
    ));
}
}
