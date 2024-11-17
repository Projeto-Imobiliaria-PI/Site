import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Imovel} from "../../entities/imovel";
import {ImovelService} from "../../services/imovel.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-visualizar-imoveis',
  templateUrl: './visualizar-imoveis.component.html',
  styleUrl: './visualizar-imoveis.component.scss'
})
export class VisualizarImoveisComponent implements OnInit {
  disponivel = 0;
  indisponivel = 0;
  list: Imovel[] = [];
  inativos: Imovel[] = [];
  pesquisa: string = '';
  imoveisFiltrados: Imovel[] = [];

  constructor(private service: ImovelService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.findAll();
  }

  contarDisponivel(): void {
    this.disponivel = this.list.filter(imovel => imovel.disponivel).length;
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach((imovel) => {
        if (imovel.disponivel) {
          this.list.push(imovel);
          this.disponivel++;
        } else {
          this.inativos.push(imovel);
          this.indisponivel++;
        }
      });
      this.imoveisFiltrados = [...this.list];
    });
  }

  apagar(id: any): void {
    this.service.apagar(id).subscribe((resposta) => {
      if (resposta === null) {
        this.service.message('Imovel apagado com sucesso!');
        this.list = this.list.filter(imovel => imovel.id !== id);
        this.imoveisFiltrados = [...this.list];
      } else {
        this.service.message('Erro ao apagar imovel!');
      }
    });
  }

  inativar(item: Imovel): void {
    item.disponivel = false;
    this.service.atualizar(item).subscribe(() => {
      this.service.message('Imovel inativado com sucesso!');
      this.list = this.list.filter(imovel => imovel.id !== item.id);
      this.inativos.push(item);
      this.disponivel--;
      this.indisponivel++;

      this.imoveisFiltrados = [...this.list];
      this.cdr.detectChanges();
    });
  }

  verInativos(): void {
    this.router.navigate(['/imovelInativo']);
  }

  filtrarImoveis(): void {
    if (this.pesquisa.trim() === '') {
      this.imoveisFiltrados = [...this.list];
    } else {
      this.imoveisFiltrados = this.list.filter(imovel =>
        imovel.logradouro.toLowerCase().includes(this.pesquisa.toLowerCase())
      );
    }
  }

}
