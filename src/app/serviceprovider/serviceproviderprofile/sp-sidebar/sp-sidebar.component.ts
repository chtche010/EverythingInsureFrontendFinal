import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sp-sidebar',
  templateUrl: './sp-sidebar.component.html',
  styleUrls: ['./sp-sidebar.component.css']
})
export class SpSidebarComponent implements OnInit{

  currentIcon!: string;
  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
    //this.loadUserProfile();
    //this.loadAddress(this.serviceProviderId);
    //this.loadBankDetails();
    this.currentIcon = this.authService.getCurrentIcon();
  }

  logout() {
    this.authService.logout();
  }
}
