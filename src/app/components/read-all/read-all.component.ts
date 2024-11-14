import { Component, OnInit } from '@angular/core';
import { Vendedor } from "../../entities/vendedor";
import { VendedorService } from "../../services/vendedor.service";
import { Router } from "@angular/router";
import { ChangeDetectorRef } from '@angular/core';  // Importar ChangeDetectorRef

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
      this.vendedoresFiltrados = [...this.list];  // Defina o estado inicial da lista filtrada
    });
  }

  apagar(id: any): void {
    this.service.apagar(id).subscribe((resposta) => {
      if (resposta === null) {
        this.service.message('Vendedor apagado com sucesso!');
        this.list = this.list.filter(vendedor => vendedor.ra !== id);
        this.vendedoresFiltrados = [...this.list];  // Atualizar lista filtrada
      } else {
        this.service.message('Erro ao apagar vendedor!');
      }
    });
  }

  inativar(item: Vendedor): void {
    item.ativo = false;
    this.service.atualizar(item).subscribe(() => {
      this.service.message('Vendedor inativado com sucesso!');

      // Atualize a lista de vendedores ativos removendo o vendedor inativado
      this.list = this.list.filter(vendedor => vendedor.ra !== item.ra);
      this.inativos.push(item);  // Adicionar o item na lista de inativos
      this.ativo--;  // Decrease the active count
      this.inativo++;  // Increase the inactive count

      // Atualizar vendedores filtrados
      this.vendedoresFiltrados = [...this.list];  // Refrescar a lista filtrada após a mudança
      this.cdr.detectChanges();  // Forçar o Angular a detectar mudanças
    });
  }

  verInativos(): void {
    this.router.navigate(['/inativos']);
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

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
