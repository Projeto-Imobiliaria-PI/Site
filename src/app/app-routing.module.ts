import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InativosComponent} from "./components/inativos/inativos.component";
import {ReadAllComponent} from "./components/read-all/read-all.component";
import {CadastroComponent} from "./components/cadastro/cadastro.component";
import {AtualizarComponent} from "./components/atualizar/atualizar.component";

const routes: Routes = [
  {
    path: '',
    component: ReadAllComponent
  },
  {
    path: 'inativos',
    component: InativosComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  },
  {
    path: 'atualizar/:id',
    component: AtualizarComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
