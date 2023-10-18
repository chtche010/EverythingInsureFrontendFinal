import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent {
  userProfile: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  this.loadAdminProfile()
  }


  
  loadAdminProfile(){
    this.authService.getadminProfile().subscribe(
      (res) => {
        this.userProfile = res.data
        console.log(res)
      },
      (err) => {
        console.log(err)
      }
    )
  }

}
