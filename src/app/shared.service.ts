import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { initialsignup } from './models/initialsignup.model';
import { addclaimsagent } from './models/claimagent/addclaimsagent';
import { addclaim } from './models/claimagent/addclaim';
import { addserviceproviderdetails } from './models/serviceprovider/addserviceproviderdetails';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'
import { addserviceproviderbank } from './models/serviceprovider/addserviceproviderbank';
import { addserviceprovideraddress } from './models/serviceprovider/addserviceprovideraddress';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
    // baseAPIUrl = "http://localhost:5184/";
    // private userPayload: any;
    // private jwtHelper: JwtHelperService;

    // constructor(
    //     private http: HttpClient,
    //     private router: Router) {
    //         const token = this.getToken();
    //         this.userPayload = this.decodeToken(token);
    //         this.jwtHelper = new JwtHelperService();
    //      }

 

    // // Claims agent

    // addClaim(addClaimsRequest : addclaim): Observable<addclaim> {    
    //     return this.http.post<addclaim>(this.baseAPIUrl + 'api/Claims/Add-Claim', addClaimsRequest);
    // }

    // addClaimsAgent(addClaimsAgentRequest : addclaimsagent): Observable<addclaimsagent> {    
    //     return this.http.post<addclaimsagent>(this.baseAPIUrl + 'api/ClaimsAgent/Create Claims Agent Profile', addClaimsAgentRequest);
    // }

    // // Service Provider
    // addServiceProviderDetails(addServiceProviderDetailsRequest : addserviceproviderdetails): Observable<addserviceproviderdetails> {    
    //     return this.http.post<addserviceproviderdetails>(this.baseAPIUrl + 'api/ServiceProvider/Create-ServiceProvider-Profile', addServiceProviderDetailsRequest);
    // }

    // addServiceProviderAddress(addServiceProviderAddressRequest : addserviceproviderbank): Observable<addserviceprovideraddress> {
    //     return this.http.post<addserviceprovideraddress>(this.baseAPIUrl + 'api/ServiceProvider/Add-Address', addServiceProviderAddressRequest);
    // }

    // addServiceProviderBank(addServiceProviderBankRequest: addserviceproviderbank): Observable<addserviceproviderbank> {
    //     return this.http.post<addserviceproviderbank>(this.baseAPIUrl + 'api/ServiceProvider/Add-Bank-Details', addServiceProviderBankRequest);
    // }

    // getServiceProviderProfile(): Observable<any> {
    //     return this.http.get<any>(`${this.baseAPIUrl}/api/Get-Profile`);
    //   }

    // getServiceProviderAddress(AddressId: string): Observable<any> {
    //     return this.http.get<any>(`${this.baseAPIUrl}/api/Get-Address-by-Id`);
    //   }

    // getServiceProviderBank(BankDetailsId: string): Observable<any> {
    //      return this.http.get<any>(`${this.baseAPIUrl}/api/Get-Bank-Details-by-Id`);
    //   }

    // // All
    // addInitialSignup(initialSignupRequest : initialsignup): Observable<initialsignup> {    
    //     return this.http.post<initialsignup>(this.baseAPIUrl + 'Auth/Register', initialSignupRequest);
    //    }

    // // public login(initialsignup: User): Observable<string> {
    // //     return this.http.post(this.baseAPIUrl + 'Auth/Login', initialsignup, {
    // //         responseType: 'text',
    // //     });
    // // }

    // login(loginObj: any) {
    //     return this.http.post<any>(this.baseAPIUrl + 'Auth/Login', loginObj)
    // }

    // isProfileExists(Account_UserId: string): Observable<boolean> {
    //     return this.http.get<boolean>(this.baseAPIUrl + 'Auth/CheckUserProfile' + Account_UserId);
    // }
    
    // signOut(){
    //     localStorage.clear();
    //     this.router.navigate(['login'])
    // }

    // storeToken(tokenValue: string){
    //     localStorage.setItem('token', tokenValue)
    // }

    // getToken() {
    //     return localStorage.getItem('token')
    // }

    // isLoggedIn(): boolean {
    //     return !!localStorage.getItem('token')
    // }

    // decodeToken(token: string | null) {
    //     if (token) {
    //         try {
    //             const decodedToken = this.jwtHelper.decodeToken(token);
    //             console.log('Decoded Token:', decodedToken);
    //             return decodedToken;
    //         } catch (error) {
    //             console.error('Error decoding token:', error);
    //             return null; // Handle the error gracefully
    //         }
    //     } else {
    //         console.warn('No token found.');
    //         return null; // Handle the case where no token is found
    //     }
    // }

    // setUserPayload(token: string) {
    //     this.userPayload = this.jwtHelper.decodeToken(token);
    // }

    // getusernameFromToken(){
    //     if(this.userPayload)
    //     return this.userPayload.username;
    // }

    // getemailFromToken(){
    //     if(this.userPayload)
    //     return this.userPayload.email;
    // }

    // getaccountTypeFromToken(){
    //     if(this.userPayload)
    //     return this.userPayload.accountType;
    // }

    // getAccountUserIdFromToken(){
    //     if(this.userPayload)
    //     return this.userPayload.Account_UserId;
    // }

    // // updateStudent(val: any) {

    // //     return this.http.put(this.APIUrl + '/Student', val);

    // // }

    // // deleteStudent(id: any) {

    // //     return this.http.delete(this.APIUrl + '/Student/' + id);

    // // }

    // // getDepartmentList(): Observable < any[] > {

    // //     return this.http.get < any > (this.APIUrl + '/Department');

    // // }

    // // addDepartment(val: any) {

    // //     return this.http.post(this.APIUrl + '/Department', val);

    // // }

    // // updateDepartment(val: any) {

    // //     return this.http.put(this.APIUrl + '/Department', val);

    // // }

    // // deleteDepartment(id: any) {

    // //     return this.http.delete(this.APIUrl + '/Department/' + id);

    // // }

}