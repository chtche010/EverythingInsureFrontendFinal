import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { initialsignup } from '../models/initialsignup.model';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { addclaimsagent, ServiceResponse } from '../models/claimagent/addclaimsagent';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl: string = "http://localhost:5184/";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }),
    observe: 'body' as const
  };

  constructor(private http: HttpClient, private router: Router) { }

  // all users 

  public register(InitialSignUp: initialsignup): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'Auth/Register', InitialSignUp);
  }

  public login(InitialSignUp: initialsignup): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.baseUrl + 'Auth/Login', InitialSignUp);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // claims agents 

  addClaimsAgent(newCA: addclaimsagent): Observable<ServiceResponse<any>> {
    return this.http.post<ServiceResponse<any>>(this.baseUrl + 'api/ClaimsAgent/Create Claims Agent Profile', { newCA });
  }

  getcaprofile(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/ClaimsAgent/Get-Profile');
  }

  // Adding an auction 

  submitClaimData(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'api/Claims/AddClaim', data, this.httpOptions);
  }

  createAuction(auctionData: any) {
    return this.http.post(`${this.baseUrl}api/Auction/CreateAuction`, auctionData);
  }

  createGuidePrice(guidePriceData: any) {
    return this.http.post(`${this.baseUrl}api/GuidePrice/CreateGuidePrice`, guidePriceData);
  }

  createGuidePriceMaterial(materialData: any) {
    return this.http.post(`${this.baseUrl}api/GuidePrice/CreateGuidePriceMaterial`, materialData);
  }

  // service providers 

  public getspdetails(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}api/ServiceProvider/Get-Profile`);
  }

  public updatespdetails(profileData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}api/ServiceProvider/Update-Profile`, profileData);
  }

  // Method to submit the form data
  submitForm(formData: any) {

    // posting basic details
    this.http.post(this.baseUrl + "api/ServiceProvider/Create ServiceProvider Profile", formData.basic)
      .subscribe(
        (response) => {
          console.log("Basic details submitted successfully!");
         
        },
        (error) => {
          console.error("Error submitting basic details:", error);
     
        }
      );

    // posting address details
    this.http.post(this.baseUrl + "api/ServiceProvider/Add Address", formData.address)
      .subscribe(
        (response) => {
          console.log("Address details submitted successfully!");
          
        },
        (error) => {
          console.error("Error submitting address details:", error);
          
        }
      );

    // posting banking details
    this.http.post(this.baseUrl + "api/ServiceProvider/Add Bank Details", formData.banking)
      .subscribe(
        (response) => {
          console.log("Banking details submitted successfully!");
      
        },
        (error) => {
          console.error("Error submitting banking details:", error);
        
        }
      );
  }
}

