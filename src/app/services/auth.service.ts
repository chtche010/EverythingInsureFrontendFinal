import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError  } from 'rxjs';
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
import { verifyEmail } from '../models/verifyEmail.model';
import { notificationPreferences } from '../models/notificationPreferences';
import { rejectionObject } from '../models/rejectionObject';
import { updateClaim } from '../models/claimagent/updateClaim';
import { createBid } from '../models/serviceprovider/createBid';
import { createBidMaterial } from '../models/serviceprovider/createBidMaterial';
import { getBids } from '../models/serviceprovider/getBids';
import { getspAddress } from '../models/serviceprovider/getspAddress';
import { notificationPreferencesEmail } from '../models/notificationPreferencesEmail';
import { catchError } from 'rxjs';

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

  private bidId!: number;
  private bidIdSubject = new BehaviorSubject<number>(0);
  bidId$ = this.bidIdSubject.asObservable();

  private addressId!: number;
  private addressIdSubject = new BehaviorSubject<number>(0);
  addressId$ = this.addressIdSubject.asObservable();

  private httpOptions = {
    headers: new HttpHeaders().set(
      "Authorization",
      "bearer " + this.getToken(),
    ),
  };

  private httpOptionsMultipart = {
    headers: new HttpHeaders({
      "Authorization": "bearer " + this.getToken(),
      "Content-Type": "multipart/form-data;"
    }),
  };

  constructor(private http: HttpClient, private router: Router) { }

  // all users 

  public register(InitialSignUp: initialsignup): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'Auth/Register', InitialSignUp);
  }

  public login(InitialSignUp: initialsignup): Observable<{ data: string }> {
    console.log(InitialSignUp)
    return this.http.post<{ data: string }>(this.baseUrl + 'Auth/Login', InitialSignUp);
   
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  // claims agents 

 // uploadImages(claimId: number, formData: FormData): Observable<any> {
   // return this.http.post(this.baseUrl + `api/Claims/UploadImages?claimId=${claimId}`, formData, this.httpOptionsMultipart);
  //}

 //getClaimImages(claimId: number): Observable<string[]> {
   // const url = `${this.baseUrl}api/Claims/GetImages?claimId=${claimId}`;
   // return this.http.get<string[]>(url);
  //}
  uploadImages(claimId: number, files: File[]): Observable<any> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    return this.http.post<any>(`${this.baseUrl}api/Claims/UploadImages?claimId=${claimId}`, formData, this.httpOptions);
  }

  getClaimImages(auctionId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}api/Claims/GetImages?claimId=${auctionId}`, this.httpOptions);
  }

  getToken(){
    var tokenstring=localStorage.getItem("authToken")
    if (tokenstring!=null){var token=JSON.parse(tokenstring)
      console.log(token.data)
      return token.data
    }
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

  updateclaim(updatedClaimData: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'api/Claims/Update Claim', updatedClaimData, this.httpOptions);
  }

  updateauction(updatedAuctionData: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'api/Auction/Update auction', updatedAuctionData, this.httpOptions);
  }

  deleteClaim(claimId: number): Observable<any> {
    const url = `${this.baseUrl}api/Claims/Delete Claim?id=${claimId}`;
    return this.http.delete(url, this.httpOptions);
  }

  deleteAuction(auctionId: number): Observable<any> {
    const url = `${this.baseUrl}api/Auction/${auctionId}`;
    return this.http.delete(url, this.httpOptions);
  }

getAllClaimInformaation(bidId: number): Observable<any> {
    const url = `${this.baseUrl}api/Claims/GetClaimById?id=${bidId}`; // Include the bidId in the URL
    return this.http.get<any>(url, this.httpOptions);
  }

  public selectWinner(requestData: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + "api/Auction/SelectWinner", requestData, this.httpOptions);
  }

  public getReportNotAwarded(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/Auction/GetReportNotAwarded', this.httpOptions);
  }

  public awardAuctions(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'api/Auction/GetAllReports', this.httpOptions);
  }

  public getReportAwarded(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/Auction/GetReportAwarded', this.httpOptions);
  }

  public setAuctionDate(auctionReportId: number, date: string): Observable<any> {
    const url = `${this.baseUrl}api/Auction/SetDate?auctionReportId=${auctionReportId}&date=${date}`;
    return this.http.put(url, this.httpOptions);
  }

  // Adding an auction 

  submitClaimData(claimData: addclaim): Observable<ServiceResponse<any>> {
    return this.http.post<ServiceResponse<any>>(this.baseUrl + 'api/Claims/Add Claim', claimData, this.httpOptions);
  }

  createAuction(auctionData: addauctiondetail): Observable<ServiceResponse<any>> {
    return this.http.post<ServiceResponse<any>>(this.baseUrl + 'api/Auction/Create Auction', auctionData, this.httpOptions);
  }

  createGuidePrice(guidePriceData: addguideprice): Observable<ServiceResponse<any>> {
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

  //favouriteAuction

  favouriteAuction(auctionID: number): Observable<any> {
    const url = `${this.baseUrl}api/Auction/${auctionID}/favfourite`;
    return this.http.post<any>(url, null, this.httpOptions);
  }

  unfavouriteAuction(auctionID: number): Observable<any> {
    const url = `${this.baseUrl}api/Auction/${auctionID}/unfavfourite`;
    return this.http.post<any>(url, null, this.httpOptions);
  }

  getAllfavouriteAuction(): Observable<any> {
    const url = `${this.baseUrl}api/Auction/getAllFavfourite`;
    return this.http.post<any>(url, null, this.httpOptions);
  }

  GetUpcomingFavAuctions(): Observable<any> {
    const url = `${this.baseUrl}api/Auction/GetUpcomingFavAuctions`;
    return this.http.post<any>(url, null, this.httpOptions);
  }

  GetOpenFavAuctions(): Observable<any> {
    const url = `${this.baseUrl}api/Auction/GetOpenFavAuctions`;
    return this.http.post<any>(url, null, this.httpOptions);
  }

  GetClosedFavAuctions(): Observable<any> {
    const url = `${this.baseUrl}api/Auction/GetClosedFavAuctions`;
    return this.http.post<any>(url, null, this.httpOptions);
  }

  private currentIcon: string = 'favorite_border'; // 'default-icon' is the initial icon

  // Getter and Setter for the icon state
  getCurrentIcon(): string {
    return this.currentIcon;
  }

  setCurrentIcon(iconName: string): void {
    this.currentIcon = iconName;
  }
 //NEW favorite an auction 17/10/2023
 getLikedAuctions(): Observable<any> {
  return this.http.get<any>(this.baseUrl + "api/ServiceProvider/GetLikedAuctions", this.httpOptions);
}

//likeAuction(auctionId: number): Observable<any> {
 // return this.http.post<any>(this.baseUrl + "api/ServiceProvider/LikeAuction", auctionId, this.httpOptions);
//}
likeAuction(auctionId: number): Observable<any> {
  const url = `${this.baseUrl}api/ServiceProvider/LikeAuction?auctionId=${auctionId}`;
  return this.http.post<any>(url, null, this.httpOptions);
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

  setaddressId(addressId: number): void {
    this.addressId = addressId;
  }

  getaddressId(): number {
    return this.addressId;
  }

  getAddressById(addressId: number): Observable<getspAddress> {
    const url = `${this.baseUrl}api/ServiceProvider/GetAddressbyId?id=${addressId}`;
    return this.http.get<getspAddress>(url, this.httpOptions);
  }

  public getalladdress(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "api/ServiceProvider/Get All Addresses", this.httpOptions);
  }

  public updateaddress(addressData: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + "api/ServiceProvider/Update Address", addressData, this.httpOptions);
  }

  submitBid(bidData: createBid): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'api/Bid/CreateBid', bidData, this.httpOptions);
  }

  submitBidMaterial(materialData: createBidMaterial): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'api/Bid/CreateBidMaterial', materialData, this.httpOptions);
  }

  setBidId(bidId: number): void {
    this.bidId = bidId;
  }

  getBidId(): number {
    return this.bidId;
  }

  public getbiddetails(): Observable<getBids[]> {
    return this.http.get<getBids[]>(this.baseUrl + "api/Bid/GetAllBids", this.httpOptions);
  }

  updatebid(updatedBidData: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + "api/Bid/UpdateBid", updatedBidData, this.httpOptions);
  }

  getSingleBid(bidId: number): Observable<any> {
    const url = `${this.baseUrl}api/Bid/GetSingleBid?id=${bidId}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  getAllMaterials(bidId: number): Observable<any> {
    const url = `${this.baseUrl}api/Bid/GetAllMaterials?BidId=${bidId}`; // Include the bidId in the URL
    return this.http.get<any>(url, this.httpOptions);
  }

  updateBidMaterial(updatedMaterialData: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + "api/Bid/UpdateBidMaterial", updatedMaterialData, this.httpOptions);
  }

  getSingleBidMaterial(bidMaterialId: number): Observable<any> {
    const url = `${this.baseUrl}api/Bid/GetSingleBidMaterial?id=${bidMaterialId}`;
    return this.http.get<any>(url, this.httpOptions);
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

  //otp verification

  sendOTPEmail(email: string) {
    return this.http.post<any>(this.baseUrl + 'Auth/sendOTP', { "email": email })

  }

  verifyOTP(otp: string) {
    return this.http.post<any>(this.baseUrl + 'Auth/verifyOTP', { "otp": otp })
  }

  parseEmail(emailAddress: string): string {
    const regex = /^[a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(emailAddress) ? emailAddress : '';
  }

  //email verfication

  emailVeri(email: string) {
    return this.http.post<any>(this.baseUrl + 'Auth/emailVeri', { "email": email })
  }

  verifyEmail(emailVeriToken: verifyEmail) {

    console.log(emailVeriToken);
    const jsonObject = JSON.stringify(emailVeriToken);
    console.log(jsonObject);

    return this.http.post<any>(this.baseUrl + `Auth/verifyEmail`, {
      "email": emailVeriToken.email,
      "emailToken": emailVeriToken.emailVeriToken
    }
    );
  }

  checkVeri(email: string) {
    return this.http.post<any>(this.baseUrl + 'Auth/checkVeri', { "email": email })


  }

  //notiifications

  saveSettings(notificationPreferObj: notificationPreferences) {

    //  console.log('API test', notificationPreferObj);

    return this.http.post<any>(this.baseUrl + `Auth/notifications`, {
      "id": notificationPreferObj.id,
      "changesToAccounts": notificationPreferObj.changesToAccounts,
      "newAuctions": notificationPreferObj.newAuctions,
      "marketingPromo": notificationPreferObj.marketingPromo,
    });
  }

  saveSettingsEmail(notificationPreferEmailObj: notificationPreferencesEmail) {

    //  console.log('API test', notificationPreferObj);

    return this.http.post<any>(this.baseUrl + `Auth/notificationsEmail`, {
      "email": notificationPreferEmailObj.email,
      "changesToAccounts": notificationPreferEmailObj.changesToAccounts,
      "newAuctions": notificationPreferEmailObj.newAuctions,
      "marketingPromo": notificationPreferEmailObj.marketingPromo,
    });
  }



  pushNotifications(accountID: number): Observable<any> {
    const url = `${this.baseUrl}Auth/returnNotifications?id=${accountID}`;
    return this.http.post<any>(url, this.httpOptions);
  }

    pushNotificationsEmail(email: string): Observable<any> {
      const url = `${this.baseUrl}Auth/returnNotificationsEmail?email=${email}`;
      return this.http.post<any>(url,null, this.httpOptions);
    }

  

    

        getadminProfile(): Observable<any> {
          return this.http.get<any>(this.baseUrl + 'api/Admin/GetAdminProfile', this.httpOptions);
        }
  
  




  // pushNotifications(accountID: number): Observable<any> {
  //   const url = `${this.baseUrl}Auth/returnNotifications?id=${accountID}`;
  //   return this.http.post<any>(url, this.httpOptions);
  // }

  // pushNotificationsEmail(email: string): Observable<any> {
  //   const url = `${this.baseUrl}Auth/returnNotificationsEmail?email=${email}`;
  //   return this.http.post<any>(url, null, this.httpOptions);
  // }

  //Reporting
//getCountClaims(): Observable<number> {
  //const url = `${this.baseUrl}api/ClaimsAgentReport/CountClaims`;
  //return this.http.get<number>(url, this.httpOptions);
//}
  public getCountClaims(): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'api/ClaimsAgentReport/CountClaims', this.httpOptions);
  }

  public getCountUpcomingAuctions(): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'api/ClaimsAgentReport/CountUpcomingAuctions', this.httpOptions);
  } 

  getUserAuctionStats(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/ClaimsAgentReport/GetUserAuctionStats', this.httpOptions);
  }

 public getAverageNumberOfBids(): Observable<any> {
  return this.http.get<any>(this.baseUrl + 'api/ClaimsAgentReport/GetAverageNumberOfBids', this.httpOptions);
}

  //Admin services



  getServiceProviders(): Observable<manageAuctions[]> {
    return this.http.get<manageAuctions[]>(this.baseUrl + 'api/Admin/GetServiceProviders', this.httpOptions);
  }

    getClaimsAgent(): Observable<any> {
      // console.log(this.httpOptions)
      return this.http.get<any>(this.baseUrl + 'api/Admin/GetClaimsAgent', this.httpOptions);
    }

    getAllAuction(): Observable<any> {
      // console.log(this.httpOptions)
      return this.http.get<any>(this.baseUrl + 'api/Admin/GetAllAuctions', this.httpOptions);
    }



  approveClaimsAgent(email: string): Observable<any> {
    const url = `${this.baseUrl}api/Admin/ApproveClaimsAgent?email=${email}`;
    console.log("URL message", url);

    return this.http.post(url, null, this.httpOptions);
  }

  rejectClaimsAgent(rejectionObj: rejectionObject) {

    //  console.log('API test', notificationPreferObj);

    return this.http.post<any>(this.baseUrl + `api/Admin/RejectClaimsAgent`, {
      "email": rejectionObj.email,
      "text": rejectionObj.text
    }, this.httpOptions);
  }

    disableClaimsAgent(rejectionObj: rejectionObject)
    {
  
      return this.http.post<any>(this.baseUrl + `api/Admin/DisableClaimsAgent`, {
      "email":rejectionObj.email, 
      "text":rejectionObj.text
      }, this.httpOptions);
    }

  approveServiceProvider(email: string): Observable<any> {
    const url = `${this.baseUrl}api/Admin/ApproveServiceProvider?email=${email}`;
    console.log("URL message", url);

    return this.http.post(url, null, this.httpOptions);
  }

  rejectServiceProvider(rejectionObj: rejectionObject) {

    //  console.log('API test', notificationPreferObj);

    return this.http.post<any>(this.baseUrl + `api/Admin/RejectServiceProvide`, {
      "email": rejectionObj.email,
      "text": rejectionObj.text
    }, this.httpOptions);
  }

    disableServiceProvider(rejectionObj: rejectionObject)
    {
  
    //  console.log('API test', notificationPreferObj);
  
      return this.http.post<any>(this.baseUrl + `api/Admin/DisableServiceProvider`, {
      "email":rejectionObj.email, 
      "text":rejectionObj.text
      }, this.httpOptions);
    }

    checkAccountStatus(email : string){
      return this.http.post<any>(this.baseUrl + 'Auth/CheckAccountStatus', {"email": email});
        }

        getRejectedBid(): Observable<any> {
          // console.log(this.httpOptions)
          return this.http.get<any>(this.baseUrl + 'api/Admin/GetBidRejections', this.httpOptions);
        }
  
  }




