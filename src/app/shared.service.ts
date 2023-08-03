import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { initialsignup } from './models/initialsignup.model';
import { addclaimsagent } from './models/addclaimsagent';
import { addserviceprovider } from './models/addserviceprovider';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class SharedService {

    baseAPIUrl = "http://localhost:5184/";
    private userPayload: any;

    constructor(
        private http: HttpClient,
        private router: Router) {
            this.userPayload = this.decodeToken();
         }

    addInitialSignup(initialSignupRequest : initialsignup): Observable<initialsignup> {    
     return this.http.post<initialsignup>(this.baseAPIUrl + 'Auth/Register', initialSignupRequest);
    } 

    addClaimsAgent(addClaimsAgentRequest : addclaimsagent): Observable<addclaimsagent> {    
        return this.http.post<addclaimsagent>(this.baseAPIUrl + 'api/ClaimsAgent/Create Claims Agent Profile', addClaimsAgentRequest);
    }

    addServiceProvider(addServiceProviderRequest : addserviceprovider): Observable<addserviceprovider> {    
        return this.http.post<addserviceprovider>(this.baseAPIUrl + 'api/ServiceProvider/ Create ServiceProvider Profile', addServiceProviderRequest);
    }

    login(loginObj: any) {
        return this.http.post<any>(this.baseAPIUrl + 'Auth/Login', loginObj)
    }

    isProfileExists(email: string): Observable<boolean> {
        return this.http.get<boolean>(this.baseAPIUrl + 'Auth/CheckUserProfile' + email);
    }

    signOut(){
        localStorage.clear();
        this.router.navigate(['login'])
    }

    storeToken(tokenValue: string){
        localStorage.setItem('token', tokenValue)
    }

    getToken() {
        return localStorage.getItem('token')
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token')
    }

    // decodeToken(){
    //     const jwtHelper = new JwtHelperService();
    //     const token = this.getToken()!;
    //     console.log(jwtHelper.decodeToken(token))
    //     return jwtHelper.decodeToken(token)
    // }

    decodeToken() {
        const jwtHelper = new JwtHelperService();
        const token = this.getToken();
    
        if (token) {
            try {
                const decodedToken = jwtHelper.decodeToken(token);
                console.log('Decoded Token:', decodedToken);
                return decodedToken;
            } catch (error) {
                console.error('Error decoding token:', error);
                return null; // Handle the error gracefully
            }
        } else {
            console.warn('No token found.');
            return null; // Handle the case where no token is found
        }
    }

    getusernameFromToken(){
        if(this.userPayload)
        return this.userPayload.username;
    }

    getemailFromToken(){
        if(this.userPayload)
        return this.userPayload.email;
    }

    getaccountTypeFromToken(){
        if(this.userPayload)
        return this.userPayload.accountType;
    }

    getAccountUserIdFromToken(){
        if(this.userPayload)
        return this.userPayload.Account_UserId;
    }

    // updateStudent(val: any) {
    //     return this.http.put(this.APIUrl + '/Student', val);
    // }
    // deleteStudent(id: any) {
    //     return this.http.delete(this.APIUrl + '/Student/' + id);
    // }
    // getDepartmentList(): Observable < any[] > {
    //     return this.http.get < any > (this.APIUrl + '/Department');
    // }
    // addDepartment(val: any) {
    //     return this.http.post(this.APIUrl + '/Department', val);
    // }
    // updateDepartment(val: any) {
    //     return this.http.put(this.APIUrl + '/Department', val);
    // }
    // deleteDepartment(id: any) {
    //     return this.http.delete(this.APIUrl + '/Department/' + id);
    // }
}