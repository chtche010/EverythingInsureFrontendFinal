import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sp-navbar',
  templateUrl: './sp-navbar.component.html',
  styleUrls: ['./sp-navbar.component.css']
})
export class SpNavbarComponent {

  constructor(private authService: AuthService) { }
  
  logout() {
    this.authService.logout();
  }

}
