import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InativosComponent } from "./components/inativos/inativos.component";
import { ReadAllComponent } from "./components/read-all/read-all.component";
import { CadastroComponent } from "./components/cadastro/cadastro.component";
import { AtualizarComponent } from "./components/atualizar/atualizar.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from './guards/auth.guard';  // Importando o AuthGuard

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
    canActivate: [AuthGuard] // Protege a rota
  },
  {
    path: 'inativos',
    component: InativosComponent,
    canActivate: [AuthGuard] // Protege a rota
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    canActivate: [AuthGuard] // Protege a rota
  },
  {
    path: 'atualizar/:id',
    component: AtualizarComponent,
    canActivate: [AuthGuard] // Protege a rota
  },
  {
    path: '**',
    component: LoginComponent // Redireciona qualquer rota desconhecida para o login
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
