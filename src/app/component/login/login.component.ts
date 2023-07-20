import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../services/auth/auth.service";
import {User, UserAuthenticate} from "../../models/User.model";
import {Router} from "@angular/router";
import {ToastService, ToastType} from "../../services/toast/toast.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private router: Router,
              private toastService: ToastService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    const formDate = this.loginForm.value;
    let userAuth = {
      username: formDate.username,
      password: formDate.password
    }
    this.authService.authenticate(new UserAuthenticate(userAuth)).subscribe(response => {
      const user = new User(response);
      localStorage.setItem('user', JSON.stringify(user.serialize()));
      if(this.authService.isAuthenticated()){
        if(this.authService.isAdmin()){
          this.router.navigate(['/admin']);
        }
        else{
          this.router.navigate(['/employe']);
        }
      }
    }, error => {
      if(error.error.message == 'Bad credentials') {
        this.toastService.showToaster(ToastType.ERROR, "Identifiants incorrects");
      }
    })

  }
}
