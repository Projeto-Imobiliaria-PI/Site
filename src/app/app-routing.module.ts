import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InativosComponent } from "./components/inativos/inativos.component";
import { ReadAllComponent } from "./components/read-all/read-all.component";
import { CadastroVendedoresComponent } from "./components/cadastro-vendedores/cadastro-vendedores.component";
import { AtualizarVendedoresComponent } from "./components/atualizar-vendedores/atualizar-vendedores.component";
import {CadastroImoveisComponent} from "./components/cadastro-imoveis/cadastro-imoveis.component";
import { AtualizarImoveisComponent } from "./components/atualizar-imoveis/atualizar-imoveis.component";


import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'read-all',
    component: ReadAllComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inativos',
    component: InativosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastroVendedor',
    component: CadastroVendedoresComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'atualizarVendedor/:id',
    component: AtualizarVendedoresComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastroImovel',
    component: CadastroImoveisComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'atualizarImovel/:id',
    component: AtualizarImoveisComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
