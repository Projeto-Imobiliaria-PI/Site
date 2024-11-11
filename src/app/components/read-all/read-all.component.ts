import { Component, OnInit } from '@angular/core';
import { Vendedor } from "../../entities/vendedor";
import { VendedorService } from "../../services/vendedor.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.scss']
})
export class ReadAllComponent implements OnInit {
  ativo = 0;
  inativo = 0;
  list: Vendedor[] = [];
  inativos: Vendedor[] = [];
  pesquisa: string = '';
  vendedoresFiltrados: Vendedor[] = [];

  constructor(private service: VendedorService, private router: Router) { }

  ngOnInit(): void {
    this.findAll();
  }

  contarAtivos(): void {
    for (let vendedor of this.list) {
      if (vendedor.ativo) {
        this.ativo++;
      }
    }
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach((vendedor) => {
        if (vendedor.ativo) {
          this.list.push(vendedor);
          this.ativo++;
        } else {
          this.inativos.push(vendedor);
          this.inativo++;
        }
      });
      this.vendedoresFiltrados = [...this.list];
    });
  }

  apagar(id: any): void {
    this.service.apagar(id).subscribe((resposta) => {
      if (resposta === null) {
        this.service.message('Vendedor apagado com sucesso!');
        this.list = this.list.filter(vendedor => vendedor.ra !== id);
      } else {
        this.service.message('Erro ao apagar vendedor!');
      }
    });
  }

  inativar(item: Vendedor): void {
    item.ativo = false;
    this.service.atualizar(item).subscribe(() => {
      this.service.message('Vendedor inativado com sucesso!');
      this.inativos = this.inativos.filter(vendedor => vendedor.ra !== item.ra);
      this.inativo++;
      this.ativo--;
    });
  }

  verInativos(): void {
    this.router.navigate(['inativos']);
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
}
