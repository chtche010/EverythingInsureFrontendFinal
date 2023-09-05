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
   return this.http.post<any>(`${this.baseUrl}/sendResetEmail/${email}`, {})

  }

  resetPassword(resetPasswordobj: ResetPassword)
  {
    return this.http.post<any>(this.baseUrl + '/resetEmail', resetPasswordobj)

  }
}
