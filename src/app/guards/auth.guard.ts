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
      // If the user is logged in, allow access to the route
      return true;
    } else {
      // If the user is not logged in, redirect them to the login page
      this.toast.error({ detail: 'Error', summary: 'Please login first' });
      this.router.navigate(['/login']);
      return false;
    }
  }
}






