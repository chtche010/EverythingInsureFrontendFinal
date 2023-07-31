import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-serviceproviderprofile',
  templateUrl: './serviceproviderprofile.component.html',
  styleUrls: ['./serviceproviderprofile.component.css']
})
export class ServiceproviderprofileComponent {

  constructor(
    private sharedServices: SharedService
  ){}

  logout() {
    this.sharedServices.signOut();
  }
}
