import {Component, OnInit} from '@angular/core';
import {Imovel} from "../../entities/imovel";
import {ActivatedRoute, Router} from "@angular/router";
import {ImovelService} from "../../services/imovel.service";

@Component({
  selector: 'app-atualizar-imoveis',
  templateUrl: './atualizar-imoveis.component.html',
  styleUrl: './atualizar-imoveis.component.scss'
})
export class AtualizarImoveisComponent implements OnInit {
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

  constructor(
    private router: Router,
    private servico: ImovelService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.imovel.id = Number(this.route.snapshot.paramMap.get('id')!);
    this.pesquisarId();
  }

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

  pesquisarId(): void {
    this.servico.pesquisarId(this.imovel.id).subscribe(
      (resposta: Imovel) => {
        console.log(resposta);
        this.imovel = resposta;
      },
      (erro: any) => {
        console.error('Erro ao buscar imovel:', erro);
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['/visualizarImovel']);
  }

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

  atualizar(): void {
    if (!this.validarCampos()) {
      return;
    }
    this.servico.atualizar(this.imovel).subscribe(
      (resposta: any) => {
        this.servico.message('Dados do imovel atualizados com sucesso!');
        this.router.navigate(['/visualizarImovel']);
      },
      (err: any) => {
        this.servico.message('Erro ao atualizar dados do imovel!');
      }
    );
  }
}
