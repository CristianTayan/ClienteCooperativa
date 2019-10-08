import { ApiServiceService } from './../../api-service.service';
import { PagoService } from './../../services/pago.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ParseSpan } from '@angular/compiler';
import { Router } from '@angular/router';


@Component({
  selector: 'app-consultar-pago',
  templateUrl: './consultar-pago.component.html',
  styleUrls: ['./consultar-pago.component.scss']
})
export class ConsultarPagoComponent implements OnInit {
  a = 10000;
  b = 100000000;
  id ;
  data;
  dataForm: FormGroup;
  isLoadingResults = true;
  a_pagar = 0;
  alerta = false;
  pago = 'ABONOS';
  estado_transaccion = 'EN PROCESO';
  numero_transaccion = Math.round(Math.random()*(this.b-this.a)+(this.a));
  codigo_bancario = 47700018;
  valor_anual;

  constructor(private api: PagoService, private authService: ApiServiceService, private formBuilder: FormBuilder, private router: Router) {
    this.dataForm = this.formBuilder.group({
      'id' : [null, Validators.required]
    })
  }

  ngOnInit() {
    this.verificarSesion();
  }

  numero() {
    var aleatorio = Math.random();
    console.log(aleatorio);

  }

  onload(){
    this.api.getCliente(this.id)
    .subscribe(res => {
      this.data = res;
      for (let item of this.data) {
        this.a_pagar += parseFloat(item.emision)+ parseFloat(item.interes)+ parseFloat(item.recargo);
      }
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  confirmar(index) {

    var r = confirm("Seguro desea realizar el pago?");
    if (r == true) {
      this.realizarPago(index);
    } else {
      console.log('cancelado');

    }

  }

  consultar(){
    console.log(this.id);
    this.api.getCliente(this.id)
    .subscribe(res => {
      this.a_pagar =  0;
      this.alerta = false;
      this.data = res;
      console.log(this.data);
      this.onload();
      // this.id='';
    }, err => {
      this.data = err;
      if (this.data.error === 'no encontrado') {
        this.alerta= true;
        this.data = [];
        this.a_pagar=0;
        this.id='';
      } else{
        this.alerta = false;
      }
    });

  }

  realizarPago(index){
    var now = new Date();
    let data = this.data[index];
    let nroemision = data.nroemision;
    var datos = {};
    datos['EMI01TNROEMI']=nroemision;
    datos['EMI01TNROTRANS']=this.numero_transaccion; // dato que proporciona la entidad financiera;
    datos['EMI01TESTADO'] =this.estado_transaccion;
    datos['EMI01TCODIBAN']= this.codigo_bancario;
    datos['EMI01TVALOR']=parseFloat(data.emision) + parseFloat(data.interes)+ parseFloat(data.recargo);
    datos['EMI01TFPAG'] = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()+ " "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
    datos['EMI01TFCONCI'] = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()+ " "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
    this.api.pagar(datos,nroemision)
    .subscribe(res => {
      // this.verificarPago(index);
    }, (err) => {
      console.log(err);
    });
  }

  verificarPago(index){
    let data = this.data[index];
    let id_transaccion = data.id;
    var datos = {};
    datos['estado'] = this.pago;
    datos['nroemision'] = data.nroemision;
    this.api.updateImpuesto(id_transaccion, datos)
    .subscribe(res => {
      this.consultar();
    }, (err) => {
      this.estado_transaccion = 'ERROR DE TRANSACCION';
    });
  }

  verificarSesion() {
    let estado = this.authService.isLoggedIn();
    if (estado !== true) {
      this.router.navigateByUrl('/login');
    }

  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
