import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Ingrediente } from '../models/ingrediente';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {
  private urlEndPoint = 'http://localhost:8081/api/ingredientes/';
  private header = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private http:HttpClient) { }

  getIngredientes(): Observable<Ingrediente[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as Ingrediente[])
    );
  }

  getIngrediente(id:string): Observable<Ingrediente>{
    return this.http.get<Ingrediente>(
      this.urlEndPoint + id
    );
  }

  create(ingrediente:Ingrediente): Observable<Ingrediente>{
    return this.http.post<Ingrediente>(
      this.urlEndPoint,
      ingrediente,
      {
        headers: this.header
      }
    );
  }

  delete(id:number): Observable<Ingrediente>{
    return this.http.delete<Ingrediente>(
      this.urlEndPoint + id.toString(),
      {
        headers: this.header
      }
    );
  }
}
