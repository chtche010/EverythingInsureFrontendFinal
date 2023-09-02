import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ca-navbar',
  templateUrl: './ca-navbar.component.html',
  styleUrls: ['./ca-navbar.component.css']
})

export class CaNavbarComponent {
  userProfile: any;

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void{
    this.getcaprofile();
  }

  getcaprofile(): void {
    this.authService.getcaprofile().subscribe(
      (response) => {
        console.log(response)
        this.userProfile = response.data;
        console.log('Claim Agent Profile', this.userProfile);
      }, 
      (error) => {
        console.log('Error returning claim agent profile', error);
      }
    );
  }
}