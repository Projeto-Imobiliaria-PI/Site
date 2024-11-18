import { Component, OnInit } from '@angular/core';
import { Vendedor } from "../../entities/vendedor";
import { VendedorService } from "../../services/vendedor.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-atualizar',
  templateUrl: './atualizar-vendedores.component.html',
  styleUrls: ['./atualizar-vendedores.component.scss']
})
export class AtualizarVendedoresComponent implements OnInit {
  vendedor: Vendedor = {
    nome: '',
    cpf: '',
    area: '',
    dataAdmissao: new Date(),
    ativo: true,
  };

  constructor(
    private router: Router,
    private servico: VendedorService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.vendedor.ra = this.route.snapshot.paramMap.get('id')!;
    this.pesquisarRA();
  }

  pesquisarRA(): void {
    this.servico.pesquisarRa(this.vendedor.ra).subscribe(
      (resposta) => {
        console.log(resposta);
        this.vendedor = resposta;
      },
      (erro) => {
        console.error('Erro ao buscar vendedor:', erro);
      }
    );
  }


  cancelar(): void {
    this.router.navigate(['/visualizarVendedor']);
  }

  formatarData(): void {
    let data = new Date(this.vendedor.dataAdmissao).toISOString();
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


  atualizar(): void {
    if (!this.validarCampos()) {
      return;
    }

    if (!this.validarCPF(this.vendedor.cpf)) {
      this.servico.message('CPF inválido!');
      return;
    }

    this.formatarData();
    this.servico.atualizar(this.vendedor).subscribe(
      (resposta) => {
        this.servico.message('Dados do Vendedor atualizados com sucesso!');
        this.router.navigate(['/visualizarVendedor']);
      },
      (err) => {
        this.servico.message('Erro ao atualizar dados do vendedor!');
      }
    );
  }
}
