import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private sharedService: SharedService, 
    private router: Router, 
    private toast: NgToastService){

  }

  canActivate(): boolean {
    // if (this.sharedService.isLoggedIn()){
    //   return true
    // } else {
    //   this.toast.error({detail: "Error", summary:"Please login first"});
    //   this.router.navigate(['/login'])
    //   return false;
    // }

    if (this.sharedService.isLoggedIn()){
      // Get the users accountType from the sharedService 
      const accountType = this.sharedService.getaccountTypeFromToken();

      // Use the account type to decide where to redirect the user 
      switch (accountType) {
        case 'Administrator':
          this.router.navigate(['/adminprofile']);
          break;
        
        case 'ClaimsAgent':
          this.router.navigate(['/claimsagentprofile']);
          break; 

        case 'ServiceProvider':
          this.router.navigate(['/serviceproviderprofile']);
          break;
      }

      return true; // Allow access to the route 
    } else {
      this.toast.error({ detail: 'Error', summary: 'Please login first' });
      this.router.navigate(['/login']);
      return false; 
    }
  }
}
