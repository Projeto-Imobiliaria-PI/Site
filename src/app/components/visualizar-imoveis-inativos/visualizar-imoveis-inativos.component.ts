import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Imovel} from "../../entities/imovel";
import {ImovelService} from "../../services/imovel.service";

@Component({
  selector: 'app-visualizar-imoveis-inativos',
  templateUrl: './visualizar-imoveis-inativos.component.html',
  styleUrl: './visualizar-imoveis-inativos.component.scss'
})
export class VisualizarImoveisInativosComponent implements OnInit {
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

  ativar(item: Imovel): void {
    item.disponivel = true;
    this.service.atualizar(item).subscribe(() => {
      this.service.message('Imovel ativado com sucesso!');
      this.inativos = this.inativos.filter(imovel => imovel.id !== item.id);
      this.disponivel++;
      this.indisponivel--;
    });
  }

  apagar(id: any): void {
    this.service.apagar(id).subscribe((resposta) => {
      if(resposta === null) {
        this.service.message('Imovel apagado com sucesso!')
        this.list = this.list.filter(imovel => imovel.id !== id)
      } else {
        this.service.message('Erro ao apagar imovel!')
      }
    })
  }

  verAtivos(): void {
    this.router.navigate(['/visualizarImovel']);
  }
}
