import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { SharedService } from '../shared.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private sharedServices: SharedService,
    private toast: NgToastService,
    private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.sharedServices.getToken();

if(myToken){
  request = request.clone({
    setHeaders: { Authorization:`Bearer ${myToken}`}
  });
}

    return next.handle(request).pipe(
      catchError((err:any) => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.toast.warning({detail:"Warning", summary:"Token is expired, Login again"});
            this.router.navigate(['login']) //this.sharedService.signOut();
          }
        }
        return throwError(()=> new Error("Some other error occured"))
      })
    );
  }
}
