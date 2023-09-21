import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../models/resetPassword.model';
import { changePassword } from '../models/changePassword.model';


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

    return this.http.post<any>(this.baseUrl + `/resetEmail`, {
    "email":resetPasswordobj.email, 
    "emailToken":resetPasswordobj.emailToken,
    "newPassword":resetPasswordobj.newPassword,
    "confirmPassword":resetPasswordobj.confirmPassword,
    });
  }

  changePassword(changePasswordobj: changePassword){

    
    console.log(changePasswordobj);

    return this.http.post<any>(this.baseUrl + `/changePassword`, {
    "id": changePasswordobj.id,
    "oldPassword": changePasswordobj.oldPassword,
    "newPassword": changePasswordobj.newPassword,
    "confirmPassword": changePasswordobj.confirmPassword,
    });

  }
}
