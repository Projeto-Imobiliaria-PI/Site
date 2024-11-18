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

  // Função para validar campos obrigatórios
  validarCampos(): boolean {
    if (!this.imovel.logradouro) {
      this.servico.message('Logradouro é obrigatório!');
      return false;
    }
    if (!this.imovel.numero) {
      this.servico.message('Número é obrigatório!');
      return false;
    }
    if (!this.imovel.bairro) {
      this.servico.message('Bairro é obrigatório!');
      return false;
    }
    if (!this.imovel.cidade) {
      this.servico.message('Cidade é obrigatória!');
      return false;
    }
    if (!this.imovel.uf) {
      this.servico.message('UF é obrigatório!');
      return false;
    }
    if (!this.imovel.cep) {
      this.servico.message('CEP é obrigatório!');
      return false;
    }
    if (!this.imovel.tipo) {
      this.servico.message('Tipo é obrigatório!');
      return false;
    }
    if (!this.imovel.descricao) {
      this.servico.message('Descrição é obrigatória!');
      return false;
    }
    if (this.imovel.valor <= 0) {
      this.servico.message('Valor deve ser maior que zero!');
      return false;
    }
    return true;
  }

  cadastrarImovel(): void {
    if (!this.validarCampos()) {
      return;
    }

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
