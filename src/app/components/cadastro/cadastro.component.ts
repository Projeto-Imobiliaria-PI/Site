import {Component, OnInit} from '@angular/core';
import {Vendedor} from "../../entities/vendedor";
import {VendedorService} from "../../services/vendedor.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {
  vendedor: Vendedor = {
    nome: '',
    cpf: '',
    area: '',
    dataAdmissao: new Date(),
    ativo: true
  }

  constructor(private router: Router, private servico: VendedorService) { }

  ngOnInit(): void {
  }
  cancelar(): void {
    this.router.navigate(['/read-all']);
  }
  formatarData(): void{
    let data = new Date(this.vendedor.dataAdmissao).toISOString();
  }

  cadastrar(): void {
    this.formatarData();
    this.servico.cadastrar(this.vendedor).subscribe(
      (resposta) => {
        this.servico.message('Vendedor cadastrado com sucesso!');
        this.router.navigate(['/read-all']);
      },
      (err) => {
        this.servico.message('Erro ao cadastrar vendedor!');
      }
    );
  }

}
