import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RoleService } from './role.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGaurdService implements CanActivate {

  constructor(private authService: AuthService, private userService: RoleService) { }

  canActivate(): Observable<boolean> {
   /*return this.authService.user$.pipe(
      switchMap(user => {
       return this.userService.get(user.uid).valueChanges();
      })
     )*/
     return this.authService.appUser$.pipe(
      map(appUser => appUser.isAdmin)
     );
}
}
