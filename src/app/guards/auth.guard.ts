import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { of, Observable } from 'rxjs';
import { SharedService } from '../shared.service';
import { tap, map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

// @Injectable({
//   providedIn: 'root'
// })
// // export class AuthGuard implements CanActivate {
// //   constructor(
// //     private sharedService: SharedService, 
// //     private router: Router, 
// //     private toast: NgToastService){

// //   }

// //   canActivate(): Observable<boolean> {
// //     // Check if the user is logged in by calling the isLoggedIn() method from SharedService
// //     if (!this.sharedService.isLoggedIn()) {
// //       // If the user is not logged in, redirect them to the login page
// //       this.router.navigate(['/login']);
// //       return of(false);
// //     }

// //     // User is logged in, now check if they have completed the second sign-up step
// //     const Account_UserId = this.sharedService.getAccountUserIdFromToken();
// //     return this.sharedService.isProfileExists(Account_UserId).pipe(
// //       map((profileExists: boolean) => {
// //         if (profileExists) {
// //           // User profile exists, allow access to profile pages
// //           return true;
// //         } else {
// //           // User profile does not exist, redirect to the second sign-up step
// //           const accountType = this.sharedService.getaccountTypeFromToken();
// //           if (accountType === 'claimsAgent') {
// //             this.router.navigate(['/casignup']);
// //           } else if (accountType === 'serviceProvider') {
// //             this.router.navigate(['/spsignup']);
// //           } else {
// //             // Handle the case where accountType is neither claimsAgent nor serviceProvider
// //             // You can decide where to redirect them in this case (e.g., back to the login page)
// //             this.router.navigate(['/login']);
// //           }
// //           return false;
// //         }
// //       }),
// //       catchError((error) => {
// //         // Handle any errors that might occur during the isProfileExists() call
// //         console.error('Error checking user profile:', error);
// //         // Redirect the user to the login page or any other appropriate page on error
// //         this.router.navigate(['/login']);
// //         return of(false);
// //       })
// //     );
// //   }
// }


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router) {
  }
  canActivate() {

    //get the jwt token which are present in the local storage
    const token = localStorage.getItem("jwt");

    //Check if the token is expired or not and if token is expired then redirect to login page and return false
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }

}













