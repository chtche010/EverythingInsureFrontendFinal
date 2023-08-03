import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ca-profile',
  templateUrl: './ca-profile.component.html',
  styleUrls: ['./ca-profile.component.css']
})
export class CaProfileComponent {

  constructor(private authService: AuthService) {}

  getcaprofile(){
    this.authService.getcaprofile().subscribe((name: string) => {
      console.log(name);
    })
  }

}
