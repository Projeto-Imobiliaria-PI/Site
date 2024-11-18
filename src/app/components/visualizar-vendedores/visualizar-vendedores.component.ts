import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Vendedor } from "../../entities/vendedor";
import { VendedorService } from "../../services/vendedor.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-visualizar-vendedores',
  templateUrl: './visualizar-vendedores.component.html',
  styleUrl: './visualizar-vendedores.component.scss'
})
export class VisualizarVendedoresComponent implements OnInit {
  ativo = 0;
  inativo = 0;
  list: Vendedor[] = [];
  inativos: Vendedor[] = [];
  pesquisa: string = '';
  vendedoresFiltrados: Vendedor[] = [];

  constructor(private service: VendedorService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.findAll();
  }

  contarAtivos(): void {
    this.ativo = this.list.filter(vendedor => vendedor.ativo).length;
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
        this.vendedoresFiltrados = [...this.list];
      } else {
        this.service.message('Erro ao apagar vendedor!');
      }
    });
  }

  inativar(item: Vendedor): void {
    item.ativo = false;
    this.service.atualizar(item).subscribe(() => {
      this.service.message('Vendedor inativado com sucesso!');

      this.list = this.list.filter(vendedor => vendedor.ra !== item.ra);
      this.inativos.push(item);
      this.ativo--;
      this.inativo++;

      this.vendedoresFiltrados = [...this.list];
      this.cdr.detectChanges();
    });
  }

  verInativos(): void {
    this.router.navigate(['/vendedorInativo']);
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

  formatarData(data: Date): string {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
  }
}
