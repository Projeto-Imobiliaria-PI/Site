import { Component, OnInit } from '@angular/core';
import { Vendedor } from '../../entities/vendedor';
import { VendedorService } from '../../services/vendedor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro-vendedores.component.html',
  styleUrls: ['./cadastro-vendedores.component.scss'] // Corrigi o 'styleUrl' para 'styleUrls'
})
export class CadastroVendedoresComponent implements OnInit {
  vendedor: Vendedor = {
    nome: '',
    cpf: '',
    area: '',
    dataAdmissao: new Date(),
    ativo: true,
  };

  constructor(private router: Router, private servico: VendedorService) {}

  ngOnInit(): void {}

  cancelar(): void {
    this.router.navigate(['/visualizarVendedor']);
  }

  formatarData(): string {
    return new Date(this.vendedor.dataAdmissao).toISOString();
  }

  validarCPF(cpf: string): boolean {
    if (typeof cpf !== 'string') {
      cpf = String(cpf); // Garante que o cpf seja uma string
    }
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove qualquer coisa que não seja número
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0, resto;

    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);

    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);

    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
  }

  validarCampos(): boolean {
    if (!this.vendedor.nome) {
      this.servico.message('Nome é obrigatório!');
      return false;
    }
    if (!this.vendedor.cpf) {
      this.servico.message('CPF é obrigatório!');
      return false;
    }
    if (!this.vendedor.area) {
      this.servico.message('Área é obrigatória!');
      return false;
    }
    if (!this.vendedor.dataAdmissao) {
      this.servico.message('Data de Admissão é obrigatória!');
      return false;
    }
    return true;
  }

  cadastrarVendedor(): void {
    if (!this.validarCampos()) {
      return;
    }

    if (!this.validarCPF(this.vendedor.cpf)) {
      this.servico.message('CPF inválido!');
      return;
    }

    // Formata a data antes de enviar
    this.formatarData();

    this.servico.cadastrar(this.vendedor).subscribe(
      (resposta) => {
        this.servico.message('Vendedor cadastrado com sucesso!');
        this.router.navigate(['/visualizarVendedor']);
      },
      (err) => {
        this.servico.message('Erro ao cadastrar vendedor!');
      }
    );
  }
}
