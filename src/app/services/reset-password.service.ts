import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../resetPassword.model';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private baseUrl: string = "http://localhost:5184/"
  constructor(private http: HttpClient) { }

  sendResetPaswordLink(email: string)
  {
    return this.http.post<any>(this.baseUrl + 'Auth/sendResetEmai', {})

  }

  resetPassword(resetPasswordobj: ResetPassword)
  {
    return this.http.post<any>(this.baseUrl + 'Auth/resetEmail', resetPasswordobj)

  }
}
