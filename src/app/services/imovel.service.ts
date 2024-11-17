import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import {Imovel} from "../entities/imovel";
import {MatSnackBar} from "@angular/material/snack-bar";
import {imoveisEnvironment} from "../environments/imoveisEnvironment";

@Injectable({
  providedIn: 'root',
})
export class ImovelService {

baseURL = imoveisEnvironment.baseUrl;


  constructor(private http: HttpClient, private snack: MatSnackBar) {}
  findAll(): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(this.baseURL);
  }

  message(msg: string): void {
    this.snack.open(msg, 'OK', {
      horizontalPosition: 'left',
      verticalPosition: 'top',
      duration: 5000
    });
  }
  buscarCep(cep: string): Observable<any> {
    cep = cep.replace(/\D/g, '');
    if (!/^[0-9]{8}$/.test(cep)) {
      throw new Error('Formato de CEP inválido.');
    }
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }

  apagar(id: any): Observable<void> {
    const url = `${this.baseURL}/${id}`;
    return this.http.delete<void>(url);
  }

  atualizar(imovel: Imovel): Observable<Imovel> {
    const url = `${this.baseURL}/${imovel.id}`;
    return this.http.put<Imovel>(url, imovel);
  }

  cadastrar(imovel: Imovel): Observable<Imovel> {
    return this.http.post<Imovel>(this.baseURL, imovel);
  }

  pesquisarId(id: any): Observable<Imovel> {
    const url = `${this.baseURL}/${id}`;
    return this.http.get<Imovel>(url);
  }
}
