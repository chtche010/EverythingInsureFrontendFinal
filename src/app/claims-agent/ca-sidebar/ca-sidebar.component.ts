import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ca-sidebar',
  templateUrl: './ca-sidebar.component.html',
  styleUrls: ['./ca-sidebar.component.css']
})
export class CaSidebarComponent {

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }

}


