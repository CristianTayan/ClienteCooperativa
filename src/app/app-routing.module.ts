import { LoginFormComponent } from './login-form/login-form.component';
import { ConsultarPagoComponent } from './pagos/consultar-pago/consultar-pago.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaPagosComponent } from './pagos/lista-pagos/lista-pagos.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo:'login'},
  {path:'login', component:LoginFormComponent},
  {path: 'pagar', component: ConsultarPagoComponent},
  {path: 'listapagos', component: ListaPagosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
