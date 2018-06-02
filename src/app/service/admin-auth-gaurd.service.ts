import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RoleService } from './role.service';
import { switchMap, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGaurdService implements CanActivate {

  constructor(private authService: AuthService, private userService: RoleService) { }

  canActivate() {
   return this.authService.user$.pipe(
      map(user => {
     console.log( this.userService.get(user.uid));
      return false;
      })
     );
}
}
