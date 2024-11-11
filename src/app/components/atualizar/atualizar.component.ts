import { Component, OnInit } from '@angular/core';
import { Vendedor } from "../../entities/vendedor";
import { VendedorService } from "../../services/vendedor.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-atualizar',
  templateUrl: './atualizar.component.html',
  styleUrls: ['./atualizar.component.scss']
})
export class AtualizarComponent implements OnInit {
  vendedor: Vendedor = {
    nome: '',
    cpf: '',
    area: '',
    dataAdmissao: '',
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
    this.router.navigate(['']);
  }

  formatarData(): void {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.vendedor.dataAdmissao = new Date().toLocaleDateString('pt-BR', options);
  }

  atualizar(): void {
    this.formatarData();
    this.servico.atualizar(this.vendedor).subscribe(
      (resposta) => {
        this.servico.message('Dados do Vendedor atualizados com sucesso!');
        this.router.navigate(['']);
      },
      (err) => {
        this.servico.message('Erro ao atualizar dados do vendedor!');
      }
    );
  }
}