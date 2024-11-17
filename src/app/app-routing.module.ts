import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroVendedoresComponent } from "./components/cadastro-vendedores/cadastro-vendedores.component";
import { AtualizarVendedoresComponent } from "./components/atualizar-vendedores/atualizar-vendedores.component";
import {CadastroImoveisComponent} from "./components/cadastro-imoveis/cadastro-imoveis.component";
import { AtualizarImoveisComponent } from "./components/atualizar-imoveis/atualizar-imoveis.component";


import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from './guards/auth.guard';
import {VisualizarVendedoresComponent} from "./components/visualizar-vendedores/visualizar-vendedores.component";
import {VisualizarImoveisComponent} from "./components/visualizar-imoveis/visualizar-imoveis.component";
import {
  VisualizarVendedoresInativosComponent
} from "./components/visualizar-vendedores-inativos/visualizar-vendedores-inativos.component";
import {
  VisualizarImoveisInativosComponent
} from "./components/visualizar-imoveis-inativos/visualizar-imoveis-inativos.component";
import {HomeComponent} from "./components/home/home.component";

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
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'visualizarVendedor',
    component: VisualizarVendedoresComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'visualizarImovel',
    component: VisualizarImoveisComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'vendedorInativo',
    component: VisualizarVendedoresInativosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'imovelInativo',
    component: VisualizarImoveisInativosComponent,
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
