import { Component } from '@angular/core';
import { ImovelService } from "../../services/imovel.service";
import { Imovel } from "../../entities/imovel";
import { Router } from "@angular/router";

@Component({
  selector: 'app-cadastro-imoveis',
  templateUrl: './cadastro-imoveis.component.html',
  styleUrls: ['./cadastro-imoveis.component.scss']
})
export class CadastroImoveisComponent {

  imovel: Imovel = {
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: '',
    cep: '',
    tipo: '',
    descricao: '',
    valor: 0,
    disponivel: true
  };

  constructor(private router: Router, private servico: ImovelService) {}

  limparFormulario(): void {
    this.imovel = {
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: '',
      cep: '',
      tipo: '',
      descricao: '',
      valor: 0,
      disponivel: true
    };
  }

  buscarCep(): void {
    const cep = this.imovel.cep;

    if (cep) {
      this.servico.buscarCep(cep).subscribe({
        next: (dados) => {
          if (!dados.erro) {
            this.imovel.logradouro = dados.logradouro;
            this.imovel.bairro = dados.bairro;
            this.imovel.cidade = dados.localidade;
            this.imovel.uf = dados.uf;
          } else {
            this.limparFormulario();
            alert('CEP não encontrado.');
          }
        },
        error: (err) => {
          console.error(err);
          this.limparFormulario();
          alert('Erro ao buscar o CEP.');
        },
      });
    } else {
      this.limparFormulario();
    }
  }

  cadastrarImovel(): void {
    this.servico.cadastrar(this.imovel).subscribe({
      next: (response) => {
        this.servico.message('Imóvel cadastrado com sucesso!');
        this.router.navigate(['/visualizarImovel']);
      },
      error: (err) => {
        this.servico.message('Erro ao cadastrar imóvel!');
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/visualizarImovel']);
  }
}
