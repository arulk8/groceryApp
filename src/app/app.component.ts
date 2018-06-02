import { RoleService } from './service/role.service';
import { AuthService } from './service/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
constructor(private userRole: RoleService, private auth: AuthService, router: Router){
auth.user$.subscribe(user => {
  if (user) {
    userRole.save(user);
    let queryUrl = localStorage.getItem('queryurl');
    console.log("arul",queryUrl);

    router.navigate([queryUrl]);
  }
});
}
}
