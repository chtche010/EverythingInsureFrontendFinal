import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../models/resetPassword.model';


@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private baseUrl: string = "http://localhost:5184/Auth"
  constructor(private http: HttpClient) { }

  sendResetPaswordLink(email: string)
  {
    const data = { email: email };
    
   return this.http.post<any>(`${this.baseUrl}/sendResetEmail/${email}`, {"email": email});
   //problem with how im passing email
   //how do i get my URL last part
  }

  resetPassword(resetPasswordobj: ResetPassword)
  {

    console.log(resetPasswordobj);

    return this.http.post<any>(this.baseUrl + `/resetPassword`, {
    "email":resetPasswordobj.email, 
    "emailToken":resetPasswordobj.emailToken, 
    });
  }
}
