import { RoleService } from './role.service';
import { AppUser } from './../models/app-user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>; // this $ is used for differentiating between observable and variable

  constructor(public afAuth: AngularFireAuth, public route: ActivatedRoute, private ro: Router, private userService: RoleService) {
    this.user$ = afAuth.authState;
   }


  login() {
    const urlSnap = this.route.snapshot.queryParams['returnUrl'] || '/';
    localStorage.setItem('queryurl' , urlSnap);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider() );
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  get appUser$(): Observable<AppUser> {

    return this.user$.pipe(
      switchMap(user => {
        if (user) {return this.userService.get(user.uid).valueChanges(); }

        return of(null);
      })
     );

  }
}
