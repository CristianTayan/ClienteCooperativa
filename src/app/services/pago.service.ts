import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { WebDeuda } from '../pagos/web-deuda';
import { tap, catchError, map } from 'rxjs/operators';

// const httpOptions = {
//   headers: new HttpHeaders.set({'Accept': 'application/json'})
// };


const httpOptions = new  HttpHeaders().set("Content-Type", "application/json");

const Apiurl ="http://186.46.238.251/cabildo/Server/public/api/";

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  clienteIdSource = new  BehaviorSubject<number>(0);
  clienteIdData: any;
  token: any;
  logueado = false;
  correcto = false;
  headers = new HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers.append("Accept", "application/json");
    this.headers.append("Autorization","Bearer" + this.token);
    this.getToken();
  }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getCliente(id: number): Observable<any> {
    return this.http.post(Apiurl + 'transfer/consulta/' + id, {httpOptions});
  }

  updateImpuesto (id, deuda): Observable<any> {
    return this.http.put(Apiurl + 'pagar/' + id, JSON.stringify(deuda), {headers:httpOptions}).pipe(
      tap(_ => console.log(`updated id=${id}`)),
      catchError(this.handleError<any>('updateImpuesto'))
    );
  }

  addEstadoTransaccion (transaccion): Observable<WebDeuda> {
    return this.http.post<WebDeuda>(Apiurl+"verificarTransaccion", transaccion, {headers:httpOptions}).pipe(
      tap((cliente: WebDeuda) => console.log('')),
      catchError(this.handleError<WebDeuda>('addCliente'))
    );
  }

  pagar(pago, nroemision): Observable<WebDeuda>{
    return this.http.put<WebDeuda>(Apiurl+"transfer/pago/"+nroemision, pago, {headers:httpOptions}).pipe(
      tap((cliente: WebDeuda) => console.log('')),
      catchError(this.handleError<WebDeuda>('addCliente'))
    )
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getToken() {
      this.token = localStorage.getItem('token');
    }

  sendToken() {
      return this.token;
    }
    public isLoggedIn(){
      if (localStorage.getItem('token') !== null) {
        this.logueado = true;
      }
      return localStorage.getItem('token') !== null;
    }
}
