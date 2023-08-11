import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sp-sidebar',
  templateUrl: './sp-sidebar.component.html',
  styleUrls: ['./sp-sidebar.component.css']
})
export class SpSidebarComponent {
  constructor(private authService: AuthService) { }
  
  logout() {
    this.authService.logout();
  }
}
