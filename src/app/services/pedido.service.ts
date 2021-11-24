import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private urlEndPoint = 'http://localhost:8081/api/pedidos/';
  private header = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private http:HttpClient) { }

  getPedidos(): Observable<Pedido[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as Pedido[])
    );
  }

  getPedido(id:string): Observable<Pedido>{
    return this.http.get<Pedido>(
      this.urlEndPoint + id
    );
  }

  create(pedido:Pedido): Observable<Pedido>{
    return this.http.post<Pedido>(
      this.urlEndPoint,
      pedido,
      {
        headers: this.header
      }
    );
  }

  delete(id:string): Observable<Pedido>{
    return this.http.delete<Pedido>(
      this.urlEndPoint + id,
      {
        headers: this.header
      }
    );
  }
}
