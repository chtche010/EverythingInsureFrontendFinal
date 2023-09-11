import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChangepasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  currentPasswordVisible = false;
  newPasswordVisible = false;
  confirmPasswordVisible = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: [
        '',
        [Validators.required, Validators.minLength(6)] // You can add more password strength validators here
      ],
      confirmPassword: ['', Validators.required]
    });
  }

  togglePasswordVisibility(controlName: string): void {
    if (controlName === 'currentPassword') {
      this.currentPasswordVisible = !this.currentPasswordVisible;
    } else if (controlName === 'newPassword') {
      this.newPasswordVisible = !this.newPasswordVisible;
    } else if (controlName === 'confirmPassword') {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }

  submitForm(): void {
    if (this.changePasswordForm.valid) {
      // Perform the submit action here
      console.log('Form submitted successfully.');
    } else {
      // Handle form validation errors
      console.log('Form validation failed.');
    }
  }
}

