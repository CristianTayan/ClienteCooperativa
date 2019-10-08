import { ConsultarPagoComponent } from './pagos/consultar-pago/consultar-pago.component';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  baseUrl = "http://192.168.69.248:8000/api/auth/";
  token: any;
  logueado = false;
  correcto = false;

  constructor(private http: HttpClient, private router: Router) { }

  login(userInfo: User) {
    this.http.post(this.baseUrl + 'login', {email: userInfo.email,password: userInfo.password})
    .subscribe((resp: any) => {
        this.router.navigateByUrl('/pagar')
        localStorage.setItem('token', resp.token);
      }), (err:any) => {

      };
    }

  // postData(url, data) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //       'Authorization': 'Bearer '+this.token
  //     })
  //   };
  //   return this.http.post(this.baseUrl+url+'/', data, httpOptions);
  //   }
  // getToken(token) {
  //     this.token = token;
  //   }

  // sendToken() {
  //     return this.token;
  //   }

    logout() {
      localStorage.removeItem('token');
    }

    public isLoggedIn(){
      if (localStorage.getItem('token') !== null) {
        this.logueado = true;
      }
      return localStorage.getItem('token') !== null;
    }
}
