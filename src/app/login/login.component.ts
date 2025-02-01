import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerInfo:FormGroup;
  loginInfo:FormGroup;
  isLoginForm: boolean = true; // Default to login form
  headerTitle: string = 'Login'; // Default to login form
  constructor(
    private apiService: ApiService, 
    private authService: AuthServiceService,
    private router: Router
  ) {
    this.registerInfo = new FormGroup({
      name: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.loginInfo = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
   }

  ngOnInit(): void {
    
  }

  toggleForm(isLogin: boolean): void {
    if(isLogin){
      this.headerTitle = 'Login';
    }
    else{
      this.headerTitle = 'Register';
    }
    this.isLoginForm = isLogin; // Toggle the form
    this.registerInfo.reset(); // Reset the form when toggling
    this.loginInfo.reset(); // Reset the form when toggling
  }

  submitForm(formType:string){
    if(formType === 'registrationForm'){
      this.apiService.userPost(this.registerInfo.value).subscribe((data: any) => {
      });
    }

    else if(formType === 'loginForm'){
      this.apiService.loginUser(this.loginInfo.value).subscribe((data: any) => {
        if(data.token){
          this.authService.setToken(data.token);
          this.router.navigate(['/dashboard']);
        }
      }, (error) => {
        console.log(error);
        alert('Invalid login credentials');
      });
    }

    else{
      console.log("Invalid form type");
    }
        
  }

}
