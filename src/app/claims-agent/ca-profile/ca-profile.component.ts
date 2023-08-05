import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ca-profile',
  templateUrl: './ca-profile.component.html',
  styleUrls: ['./ca-profile.component.css']
})
export class CaProfileComponent implements OnInit {
  userProfile: any; 

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getcaprofile();
  }

  getcaprofile(): void {
    this.authService.getcaprofile().subscribe(
      (response) => {
        this.userProfile = response;
        console.log('Claim Agent Profile', this.userProfile);
      }, 
      (error) => {
        console.log('Error returning claim agent profile', error);
      }
    );
  }
}
