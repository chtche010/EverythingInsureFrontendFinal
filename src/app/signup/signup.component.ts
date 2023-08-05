import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  stepper: any;
  country = [
    { id: 1, name: 'South Africa'},
  ];
  province = [
    { id: 1, name: 'Eastern Cape'},
    { id: 2, name: 'Free State'},
    { id: 3, name: 'Gauteng'},
    { id: 4, name: 'KwaZulu-Natal'},
    { id: 5, name: 'Limpopo'},
    { id: 6, name: 'Mpumalanga'},
    { id: 7, name: 'Northern Cape'},
    { id: 8, name: 'North West'},
    { id: 9, name: 'Western Cape'},
  ];

  selectedCountry: number | null = null;
  selectedProvince: number | null = null;

  constructor(private builder: FormBuilder, private snackBar: MatSnackBar) { }
  isLinear = true;

  // ngOnInit(): void {
   
  // }

    Empregister: FormGroup = this.builder.group({
      basic: this.builder.group({
        registrationName: ['', Validators.required],
        tradingName: ['', Validators.required],
        contactPerson: ['', Validators.required],
        cellNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$'), Validators.maxLength(10)]],
        telNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$'), Validators.maxLength(10)]],
        email: ['', [Validators.required, Validators.email]],
        payeeType: ['', Validators.required],
        type: ['', Validators.required],
        companyRegistrationNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        VATVendor: ['', [Validators.required, Validators.pattern('^[YN]$')]],
        //VATNumber: ['', [Validators.required, Validators.pattern(/^ZA 45 \d{6}$/)]]
        //VATNumber: ['', this.conditionalVATNumberValidator()]
        VATNumber: ['', Validators.pattern(/^ZA45\d{6}$/)]

      }),
      address: this.builder.group({
        buildingName: ['', Validators.required],
        streetNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        streetName: ['', Validators.required],
        surbub: ['', Validators.required],
        city: ['', Validators.required],
        province: ['', Validators.required],
        country: ['', Validators.required],
        zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]

      }),
      banking: this.builder.group({
        Bank: ['', Validators.required],
        accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        branch: ['', Validators.required],
        branchCode: ['', Validators.required],
        accountType: ['', Validators.required],
        accountHolder: ['', Validators.required]

      })
    });

  get Basicform(){
    return this.Empregister.get("basic") as FormGroup;
  }
  get Addressform(){
    return this.Empregister.get("address") as FormGroup;
  }
  get Bankingform(){
    return this.Empregister.get("banking") as FormGroup;
  }

  ngOnInit(): void {
    this.Basicform.get('VATVendor')?.valueChanges.subscribe((value: string) => {
      const VATNumberControl = this.Basicform.get('VATNumber');

      if (value === 'Y') {
        VATNumberControl?.setValidators([Validators.required, Validators.pattern(/^ZA45\d{6}$/)]);
      } else {
        VATNumberControl?.clearValidators();
      }

      VATNumberControl?.updateValueAndValidity();
    });
  }

  // HandleSubmit() {
  //   if (this.Empregister.valid) {
  //     console.log(this.Empregister.value);
  //     this.snackBar.open('Sign up successful!', 'Close', { duration: 3000 });
  //   } else {
  //     this.snackBar.open('Failed to sign up', 'Close', { duration: 3000 });
  //   }
  // }

  HandleSubmit() {
    if (this.Empregister.valid) {
      console.log(this.Empregister.value);
      this.snackBar.open('Sign up successful!', 'Close', { duration: 3000 });
    } else {
      // Form is not valid, handle validation errors if needed
    }
  }

}



