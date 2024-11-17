import {Component, OnInit} from '@angular/core';
import {Vendedor} from "../../entities/vendedor";
import {VendedorService} from "../../services/vendedor.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro-vendedores.component.html',
  styleUrl: './cadastro-vendedores.component.scss'
})
export class CadastroVendedoresComponent implements OnInit {
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

  cadastrarVendedor(): void {
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
