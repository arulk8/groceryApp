import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>; // this $ is used for differentiating between observable and variable

  constructor(public afAuth: AngularFireAuth, public route: ActivatedRoute) {
    this.user$ = afAuth.authState;
   }


  login() {
    const urlSnap = this.route.snapshot.queryParams['returnUrl'] || '/';
    localStorage.setItem('queryurl' , urlSnap);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
