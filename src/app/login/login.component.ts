import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;  // Using the non-null assertion operator
  registerForm!: FormGroup;  // Using the non-null assertion operator
  isRegistering: boolean = false;

  constructor(private fb: FormBuilder,private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/.+@gmail\.com$/)]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]]
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/.+@Something\.com$/)]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]]
    });
  }

  // Custom validator to ensure the password has a special character and a number
  passwordValidator(control: any) {
    const value = control.value;
    if (!/[A-Z]/i.test(value) || !/\d/.test(value) || !/[\W_]/.test(value)) {
      return { invalidPassword: true };
    }
    return null;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login successful');
      localStorage.setItem('userToken', 'user_logged_in');
  
      // Get the return URL from the query parameters (default to home page if not available)
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  
      // Redirect to the returnUrl
      this.router.navigate([returnUrl]);
    }
  }

  onRegisterSubmit() {
    if (this.registerForm.valid) {
      // Handle registration logic here
      console.log('Registration successful', this.registerForm.value);
    }
  }

  // Switch to register form
  switchToRegister() {
    this.isRegistering = !this.isRegistering;
  }
}
