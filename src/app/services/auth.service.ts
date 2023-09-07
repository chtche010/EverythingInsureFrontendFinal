import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject  } from 'rxjs';
import { initialsignup } from '../models/initialsignup.model';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { addclaimsagent, ServiceResponse } from '../models/claimagent/addclaimsagent';
import { addserviceproviderdetails } from '../models/serviceprovider/addserviceproviderdetails';
import { addserviceprovideraddress } from '../models/serviceprovider/addserviceprovideraddress';
import { addserviceproviderbank } from '../models/serviceprovider/addserviceproviderbank';
import { addclaim } from '../models/claimagent/addclaim';
import { addauctiondetail } from '../models/auction/addauctiondetail';
import { addguideprice } from '../models/auction/addguideprice';
import { addmaterialcost } from '../models/auction/addmaterialcost';
import { PeriodicElement } from '../models/claimagent/manageClaims';
import { manageAuctions } from '../models/claimagent/manageAuctions';
import { ClaimReview } from '../models/claimagent/claimReview';
import { GetAllAuctions } from '../models/auction-dashboard/getallauctions';
import { getSingleAuction } from '../models/serviceprovider/getSingleAuction';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl: string = "http://localhost:5184/";

  private auctionId!: number;
  private auctionIdSubject = new BehaviorSubject<number>(0);
  auctionId$ = this.auctionIdSubject.asObservable();

  private claimId!: number;
  private claimIdSubject = new BehaviorSubject<number>(0);
  claimId$ = this.claimIdSubject.asObservable();

  private guidePriceId!: number;
  private guidePriceIdSubject = new BehaviorSubject<number>(0);
  guidePriceId$ = this.guidePriceIdSubject.asObservable();

  private serviceProviderId!: number;
  private serviceProviderIdSubject = new BehaviorSubject<number>(0);
  serviceProviderId$ = this.serviceProviderIdSubject.asObservable();

  private httpOptions = {
      headers: new HttpHeaders().set(
        "Authorization",
        "bearer " + this.getToken()
      ),
  };

  constructor(private http: HttpClient, private router: Router) { }

  // all users 

  public register(InitialSignUp: initialsignup): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'Auth/Register', InitialSignUp);
  }

  public login(InitialSignUp: initialsignup): Observable<{ data: string }> {
    return this.http.post<{ data: string }>(this.baseUrl + 'Auth/Login', InitialSignUp);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  // claims agents 

  getToken(){
    var tokenstring=localStorage.getItem("authToken")
    if (tokenstring!=null){var token=JSON.parse(tokenstring)
      console.log(token.data)
    return token.data} 
  }

  addClaimsAgent(newCA: addclaimsagent): Observable<ServiceResponse<any>> {
    return this.http.post<ServiceResponse<any>>(this.baseUrl + 'api/ClaimsAgent/Create Claims Agent Profile', newCA, this.httpOptions);
  }

  getcaprofile(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/ClaimsAgent/Get Profile', this.httpOptions);
  }

  public updatecadetails(profileData: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + "api/ClaimsAgent/Update Profile", profileData, this.httpOptions);
  }

  public cagetclaims(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>(this.baseUrl + 'api/Claims/GetAllClaims', this.httpOptions);
  }

  cagetauctions(): Observable<manageAuctions[]> {
    return this.http.get<manageAuctions[]>(this.baseUrl + 'api/Auction/GetAllAuctions', this.httpOptions);
  }

  getclaimbyid(claimId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/Claims/Get Claim by Id', this.httpOptions);
  }

  // Adding an auction 

  submitClaimData(claimData: addclaim): Observable<ServiceResponse<any>> {
    return this.http.post<ServiceResponse<any>>(this.baseUrl + 'api/Claims/Add Claim', claimData, this.httpOptions);
  }

  createAuction(auctionData: addauctiondetail): Observable<ServiceResponse<any>> {
    return this.http.post<ServiceResponse<any>>(this.baseUrl + 'api/Auction/Create Auction', auctionData, this.httpOptions);
  }

  createGuidePrice(guidePriceData: addguideprice): Observable<ServiceResponse<any>>{
    return this.http.post<ServiceResponse<any>>(this.baseUrl + 'api/GuidePrice/Create Guide Price', guidePriceData, this.httpOptions);
  }

  createGuidePriceMaterial(materialData: addmaterialcost): Observable<ServiceResponse<any>> {
    return this.http.post<ServiceResponse<any>>(this.baseUrl + 'api/GuidePrice/Create GuidePriceMaterial', materialData, this.httpOptions);
  }

  setClaimId(claimId: number): void {
    this.claimId = claimId;
  }

  getClaimId(): number {
    return this.claimId;
  }

  setAuctionId(auctionId: number): void {
    this.auctionId = auctionId;
  }

  getAuctionId(): number {
    return this.auctionId;
  }

  setGuidePriceId(guidePriceId: number): void {
    this.guidePriceId = guidePriceId; 
  }

  getGuidePriceId(): number {
    return this.guidePriceId;
  }

  // getting an auction by id

  getAuctionById(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/Auction/Get Auction by Id', this.httpOptions);
  }
  
  // service providers 

  public getspdetails(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "api/ServiceProvider/GetProfile", this.httpOptions);
  }

  public getspaddress(serviceProviderId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + "api/ServiceProvider/Get Address by Id", this.httpOptions);
  }

  public updatespdetails(profileData: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + "api/ServiceProvider/UpdateProfile", profileData, this.httpOptions);
  }

  setserviceProviderId(serviceProviderId: number): void {
    this.claimId = serviceProviderId;
  }

  getserviceProviderId(): number {
    return this.serviceProviderId;
  }

  getAddressById(addressId: number): Observable<any> {
    const url = `${this.baseUrl}api/ServiceProvider/Get Address By Id?id=${addressId}`;
    return this.http.get<any>(url, this.httpOptions);
  } 

  public updateaddress(addressData: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + "api/ServiceProvider/Update Address", addressData, this.httpOptions);
  }

  // Submitting the sign up form 

  submitBasicDetails(basicDetails: addserviceproviderdetails): Observable<{ data: string }> {
    return this.http.post<{ data: string }>(this.baseUrl + "api/ServiceProvider/Create ServiceProvider Profile", basicDetails, this.httpOptions);
  }

  submitAddressDetails(addressDetails: addserviceprovideraddress): Observable<ServiceResponse<any>> {
    return this.http.post<any>(this.baseUrl + "api/ServiceProvider/Add Address", addressDetails, this.httpOptions);
  }

  submitBankingDetails(bankingDetails: addserviceproviderbank): Observable<ServiceResponse<any>> {
    return this.http.post<ServiceResponse<any>>(this.baseUrl + "api/ServiceProvider/Add Bank Details", bankingDetails, this.httpOptions);
  }

  // Getting auctions 

  public getUpcomingAuctions(): Observable<GetAllAuctions[]> {
    return this.http.get<GetAllAuctions[]>(this.baseUrl + 'api/ServiceProvider/GetUpcomingAuctions', this.httpOptions);
  }

  public getOpenAuctions(): Observable<GetAllAuctions[]> {
    return this.http.get<GetAllAuctions[]>(this.baseUrl + 'api/ServiceProvider/GetOpenAuctions', this.httpOptions);
  }

  public getClosedAuctions(): Observable<GetAllAuctions[]> {
    return this.http.get<GetAllAuctions[]>(this.baseUrl + 'api/ServiceProvider/GetClosedAuctions', this.httpOptions);
  }

  getSingleAuction(auctionId: number): Observable<getSingleAuction> {
    const url = `${this.baseUrl}api/ServiceProvider/GetSingleAuctionDetail?id=${auctionId}`;
    return this.http.get<getSingleAuction>(url, this.httpOptions);
  }
}

