import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HttpContext, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormArrayName, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { NgToastModule } from 'ng-angular-popup'
import { MatNativeDateModule } from '@angular/material/core';
import { ClaimsagentsignupComponent } from './claimsagentsignup/claimsagentsignup.component';
import { InitialsignupComponent } from './initialsignup/initialsignup.component';
import { LoginComponent } from './login/login.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { WhyTrustUsComponent } from './why-trust-us/why-trust-us.component';
import { FAQComponent } from './faq/faq.component';
import { FooterComponent } from './footer/footer.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { ClaimsAgentDashboardComponent } from './claims-agent/claims-agent-dashboard/claims-agent-dashboard.component';
import { CaNavbarComponent } from './claims-agent/ca-navbar/ca-navbar.component';
import { CaSidebarComponent } from './claims-agent/ca-sidebar/ca-sidebar.component';
import { AuctionComponent } from './claims-agent/auction/auction.component';
import { CaProfileComponent } from './claims-agent/ca-profile/ca-profile.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { UploadClaimComponent } from './claims-agent/upload-claim/upload-claim.component';
import { ManageclaimsComponent } from './claims-agent/manageclaims/manageclaims.component';
import { ManageauctionComponent } from './claims-agent/manageauction/manageauction.component';
import { SpNavbarComponent } from './serviceprovider/serviceproviderprofile/sp-navbar/sp-navbar.component';
import { SpSidebarComponent } from './serviceprovider/serviceproviderprofile/sp-sidebar/sp-sidebar.component';
import { SpActivityComponent } from './serviceprovider/serviceproviderprofile/sp-activity/sp-activity.component';
import { ServiceproviderprofileComponent } from './serviceprovider/serviceproviderprofile/serviceproviderprofile/serviceproviderprofile.component';
import { AdminNavBarComponent } from './admin/admin-nav-bar/admin-nav-bar/admin-nav-bar.component';
import { AdminSideBarComponent } from './admin/admin-side-bar/admin-side-bar/admin-side-bar.component';
import { AdminmanageauctionComponent } from './admin/manageauction/adminmanageauction/adminmanageauction.component';
import { ManagebidComponent } from './admin/managebid/managebid/managebid.component';
import { ManagecaComponent } from './admin/manageca/manageca/manageca.component';
import { ManagespComponent } from './admin/managesp/managesp/managesp.component';
import { DatePipe } from '@angular/common';
import { AuctionDialogComponent } from './serviceprovider/serviceproviderprofile/auction-dialog/auction-dialog.component';
import { AuctionDashboardComponent } from './serviceprovider/serviceproviderprofile/auction-dashboard/auction-dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormArray } from '@angular/forms';
import { BidFormComponent } from './serviceprovider/serviceproviderprofile/bid-form/bid-form.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { OtpInputComponent } from './otp-input/otp-input.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { SpReportDashComponent } from './reporting/sp-report-dash/sp-report-dash.component';
import { CaReportDashComponent } from './reporting/ca-report-dash/ca-report-dash.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdateclaimComponent } from './claims-agent/updateclaim/updateclaim/updateclaim.component';
import { UpdateauctionComponent } from './claims-agent/updateauction/updateauction/updateauction.component';
import { CustomTimepickerComponent } from './custom-timepicker/custom-timepicker.component';
import { UpdateBidComponent } from './serviceprovider/update-bid/update-bid/update-bid.component';
import { DeleteDialogComponent } from './claims-agent/delete-claim-dialog/delete-dialog/delete-dialog.component';
import { DeleteAuctionDialogComponent } from './claims-agent/delete-auction/delete-auction-dialog/delete-auction-dialog.component';
import { AdminReportComponent } from './reporting/admin-report/admin-report.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ClaimsagentsignupComponent,
    InitialsignupComponent,
    LoginComponent,
    AdminprofileComponent,
    HomeComponent,
    AboutUsComponent,
    WhyTrustUsComponent,
    FAQComponent,
    FooterComponent,
    ClaimsAgentDashboardComponent, 
    AuctionComponent,
    CaProfileComponent,
    CaNavbarComponent,
    CaSidebarComponent,
    UploadClaimComponent,
    ManageclaimsComponent,
    ManageauctionComponent,
    SpActivityComponent,
    SpNavbarComponent,
    SpSidebarComponent,
    ServiceproviderprofileComponent,
    AdminNavBarComponent,
    AdminSideBarComponent,
    AdminmanageauctionComponent,
    ManagebidComponent,
    ManagecaComponent,
    ManagespComponent,
    AuctionDialogComponent,
    AuctionDashboardComponent,
    BidFormComponent,
    ForgotpasswordComponent,
    ChangepasswordComponent,
    ResetPasswordComponent,
    SpReportDashComponent,
    CaReportDashComponent,
    UpdateclaimComponent,
    UpdateauctionComponent,
    CustomTimepickerComponent,
    UpdateBidComponent,
    DeleteDialogComponent,
    DeleteAuctionDialogComponent,
    OtpInputComponent,
    AdminReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterModule.forRoot(routes),
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule,
    NgToastModule,
    MatDatepickerModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    NgxMaterialTimepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true }, 
  {
    provide: JWT_OPTIONS,
    useValue: JWT_OPTIONS
  },
  JwtHelperService,
  DatePipe
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
