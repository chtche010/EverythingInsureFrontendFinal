import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router) { }

  logout(): void {
        // Perform any necessary cleanup or logout actions here, if needed.
    // For example, you might want to clear local storage, session, or access tokens.

       // After performing cleanup, navigate to the login page or any other page you want to redirect to after logout.
       this.router.navigate(['']); // Replace '/login' with the route of your login page.
  }
}
