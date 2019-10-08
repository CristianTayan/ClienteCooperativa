import { ApiServiceService } from './../api-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;
  constructor(private authService: ApiServiceService, private router: Router, private formBuilder: FormBuilder) { }

  Login() {
    this.isSubmitted = true;
    this.authService.login(this.loginForm.value);
    this.router.navigateByUrl('/pagar');
  }

  verificarSesion() {
    let estado = this.authService.isLoggedIn();
    if (estado == true) {
      this.router.navigateByUrl('/pagar');
    }
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.verificarSesion();
  }

  get formControls() { return this.loginForm.controls; }
}
