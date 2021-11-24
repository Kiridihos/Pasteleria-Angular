import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { TipoPastel } from '../models/tipo-pastel';

@Injectable({
  providedIn: 'root'
})
export class TipoPastelService {
  private urlEndPoint = 'http://localhost:8081/api/tipo_pastel/';
  private header = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private http:HttpClient) { }

  getTipos(): Observable<TipoPastel[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as TipoPastel[])
    );
  }

  getTipo(id:string): Observable<TipoPastel>{
    return this.http.get<TipoPastel>(
      this.urlEndPoint + id
    );
  }

  create(tipoPastel:TipoPastel): Observable<TipoPastel>{
    return this.http.post<TipoPastel>(
      this.urlEndPoint,
      tipoPastel,
      {
        headers: this.header
      }
    );
  }

  delete(id:number): Observable<TipoPastel>{
    return this.http.delete<TipoPastel>(
      this.urlEndPoint + id,
      {
        headers: this.header
      }
    );
  }
}
