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

  atualizar(): void {
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
