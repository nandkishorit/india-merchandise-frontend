import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common'
import { Router,ActivatedRoute,RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {  
      loginFor: FormGroup | undefined;
      loading = false;
      message = '';
      loginForm: any;
      

  constructor(private fb: FormBuilder, private authService: AuthService, 
    private auth : AuthService,
    private router: Router, private route: ActivatedRoute,){
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    })
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.message = '';
   
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('response...', res);
        this.loading = false;
        this.message = 'Login successful ✅';
        // this.auth.loginSucess(res.accessToken);
        // localStorage.setItem('token', res.accessToken);
        // console.log('token....', res.accessToken);
        if (res?.accessToken) {

          this.authService.loginSuccess(res.accessToken); 
          
          if(res.roles=="seller"){
            this.router.navigate(['/seller']);
          }
          if(res.roles=="buyer"){
            this.router.navigate(['/buyer']);
          }
          if(res.roles=="admin"){
            this.router.navigate(['/admin']);
          }
        }
      },
      error: (err) => {
        console.log("err....", err);
        this.loading = false;
        this.message = 'Login failed ❌. Please try again.';
      }
    });
  }

  checkUserRole(res: any) {
    if (res.role === "seller") {
      this.router.navigate(['/free-listing']);
    } 
     if (res.role === "buyer") {
      this.router.navigate(['/contact']);
    } 
    // else {
    //   this.router.navigate(['/unauthorized']);
    // }
  }
  onLogout() {
    this.authService.logout();
  }
}
