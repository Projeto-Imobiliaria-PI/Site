import {Injectable} from "@angular/core";
import {vendedorEnvironment} from "../environments/vendedorEnvironment";
import {HttpClient} from "@angular/common/http";
import {Vendedor} from "../entities/vendedor";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";


@Injectable({
  providedIn: 'root'
})
export class VendedorService {
  baseUrl = vendedorEnvironment.baseUrl;
  constructor(private http: HttpClient, private snack: MatSnackBar) {

  }
  findAll(): Observable<Vendedor[]> {
    return this.http.get<Vendedor[]>(this.baseUrl);
  }

  message(msg: string): void {
    this.snack.open(msg, 'OK', {
      horizontalPosition: 'left',
      verticalPosition: 'top',
      duration: 5000
    });
  }

  apagar(id: any): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  atualizar(vendedor: Vendedor): Observable<Vendedor> {
    const url = `${this.baseUrl}/${vendedor.ra}`;
    return this.http.put<Vendedor>(url, vendedor);
  }

  cadastrar(vendedor: Vendedor): Observable<Vendedor> {
    return this.http.post<Vendedor>(this.baseUrl, vendedor);
  }

  pesquisarRa(ra: any): Observable<Vendedor> {
    const url = `${this.baseUrl}/${ra}`;
    return this.http.get<Vendedor>(url);
  }

}
