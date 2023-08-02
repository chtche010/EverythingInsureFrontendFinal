import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { SharedService } from '../shared.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private sharedService: SharedService, 
    private router: Router, 
    private toast: NgToastService){

  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.sharedService.isLoggedIn()) {
      // Get the user's accountType from the sharedService
      const accountType = this.sharedService.getaccountTypeFromToken();

      // Use the account type to decide where to redirect the user
      switch (accountType) {
        case 'Administrator':
          this.router.navigate(['/adminprofile']);
          return true;

        case 'ClaimsAgent':
          this.sharedService.isProfileExists(this.sharedService.getemailFromToken()).subscribe(exists => {
            if (exists) {
              this.router.navigate(['/caprofile']);
            } else {
              this.router.navigate(['/casignup']);
            }
          });
          return true;

        case 'ServiceProvider':
          this.sharedService.isProfileExists(this.sharedService.getemailFromToken()).subscribe(exists => {
            if (exists) {
              this.router.navigate(['/serviceproviderprofile']);
            } else {
              this.router.navigate(['/signup']);
            }
          });
          return true;
      }

      // If the user's role is not recognized or not one of the profiles above, redirect them to the login page.
      this.router.navigate(['/login']);
      return false;
    } else {
      this.toast.error({ detail: 'Error', summary: 'Please login first' });
      this.router.navigate(['/login']);
      return false;
    }
  }
}






