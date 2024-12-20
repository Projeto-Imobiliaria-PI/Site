import {Component, OnInit} from '@angular/core';
import {Vendedor} from "../../entities/vendedor";
import {VendedorService} from "../../services/vendedor.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-visualizar-vendedores-inativos',
  templateUrl: './visualizar-vendedores-inativos.component.html',
  styleUrl: './visualizar-vendedores-inativos.component.scss'
})
export class VisualizarVendedoresInativosComponent implements OnInit {
  ativos: Vendedor[] = [];
  inativos: Vendedor[] = [];
  list: Vendedor[] = []
  ativo = 0;
  inativo = 0;
  pesquisa: string = '';
  vendedoresFiltrados: Vendedor[] = [];
  constructor(private service: VendedorService,
              private router: Router) { }
  ngOnInit(): void {
    this.findAll();
  }
  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach(aluno => {
        if (!aluno.ativo) {
          this.inativos.push(aluno);
          this.inativo++;
        }
        else {
          this.ativos.push(aluno);
          this.ativo++;
        }
      });
    });
  }

  ativar(item: Vendedor): void {
    item.ativo = true;
    this.service.atualizar(item).subscribe(() => {
      this.service.message('Vendedor ativado com sucesso!');
      this.inativos = this.inativos.filter(vendedor => vendedor.ra !== item.ra);
      this.ativo++;
      this.inativo--;
    });
  }

  apagar(id: any): void {
    this.service.apagar(id).subscribe((resposta) => {
      if(resposta === null) {
        this.service.message('Vendedor apagado com sucesso!')
        this.list = this.list.filter(vendedor => vendedor.ra !== id)
      } else {
        this.service.message('Erro ao apagar vendedor!')
      }
    })
  }

  filtrarVendedores(): void {
    if (this.pesquisa.trim() === '') {
      this.vendedoresFiltrados = [...this.list];
    } else {
      this.vendedoresFiltrados = this.list.filter(vendedor =>
        vendedor.nome.toLowerCase().includes(this.pesquisa.toLowerCase())
      );
    }
  }

  verAtivos(): void {
    this.router.navigate(['/visualizarVendedor']);
  }
}
