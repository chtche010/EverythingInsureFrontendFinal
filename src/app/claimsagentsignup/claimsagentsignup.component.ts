import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-claimsagentsignup',
  templateUrl: './claimsagentsignup.component.html',
  styleUrls: ['./claimsagentsignup.component.css']
})
export class ClaimsagentsignupComponent implements OnInit {
  caregister!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.caregister = this.formBuilder.group({
      insuranceCompany: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  handleSubmit(): void {
    if (this.caregister.valid) {
      console.log(this.caregister.value);
    }
  }
}
