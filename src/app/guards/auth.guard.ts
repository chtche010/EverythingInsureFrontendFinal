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
    if (this.sharedService.isLoggedIn()){
      return true
    } else {
      this.toast.error({detail: "Error", summary:"Please login first"});
      this.router.navigate(['/login'])
      return false;
    }
  }
}
