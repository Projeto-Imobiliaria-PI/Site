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
    dataAdmissao: '',
    ativo: true
  }

  constructor(private router: Router, private servico: VendedorService) { }

  ngOnInit(): void {
  }
  cancelar(): void {
    this.router.navigate(['']);
  }
  formatarData(): void{
    const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: '2-digit', day: '2-digit'};
    this.vendedor.dataAdmissao = new Date().toLocaleDateString('pt-BR', options);
  }

  cadastrar(): void {
    this.formatarData();
    this.servico.cadastrar(this.vendedor).subscribe(
      (resposta) => {
        this.servico.message('Vendedor cadastrado com sucesso!');
        this.router.navigate(['']);
      },
      (err) => {
        this.servico.message('Erro ao cadastrar vendedor!');
      }
    );
  }

}
