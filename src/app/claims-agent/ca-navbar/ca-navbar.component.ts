import { Component, OnInit } from '@angular/core';
import { changePassword } from 'src/app/models/changePassword.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ca-navbar',
  templateUrl: './ca-navbar.component.html',
  styleUrls: ['./ca-navbar.component.css']
})

export class CaNavbarComponent {
  userProfile: any;
  accountUserId: number=0;


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
        console.log(response);
        this.userProfile = response.data;
        this.accountUserId = this.userProfile.account_UserId;
        console.log('account_UserId:', this.accountUserId);
       
        console.log('Claim Agent Profile', this.userProfile);
      }, 
      (error) => {
        console.log('Error returning claim agent profile', error);
      }
    );
  }
}