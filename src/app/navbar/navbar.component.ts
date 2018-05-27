import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: firebase.User;
  constructor( public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe( user => this.user = user);
  }
 logout() {
  this.afAuth.auth.signOut();
 }
  ngOnInit() {
  }

}
