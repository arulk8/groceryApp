import { RoleService } from './service/role.service';
import { AuthService } from './service/auth.service';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
constructor(private userRole: RoleService, private auth: AuthService, private ro: Router) {
auth.user$.subscribe(user => {
  if (user) {
    userRole.save(user);
    const queryUrl = localStorage.getItem('queryurl');
    if (queryUrl) {
      localStorage.removeItem('queryurl');
      ro.navigate([queryUrl]);
    }
  }
});
}
ngOnDestroy() {

}
}
