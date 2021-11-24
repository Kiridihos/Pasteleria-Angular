import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Horno } from '../models/horno';

@Injectable({
  providedIn: 'root'
})
export class HornoService {
  private urlEndPoint = 'https://pasteleria-hk-api.herokuapp.com/api/hornos/';
  private header = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private http:HttpClient) { }

  getHornos(): Observable<Horno[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as Horno[])
    );
  }

  getHorno(id:string): Observable<Horno>{
    return this.http.get<Horno>(
      this.urlEndPoint + id
    );
  }

  create(horno:Horno): Observable<Horno>{
    return this.http.post<Horno>(
      this.urlEndPoint,
      horno,
      {
        headers: this.header
      }
    );
  }

  delete(id:number): Observable<Horno>{
    return this.http.delete<Horno>(
      this.urlEndPoint + id.toString(),
      {
        headers: this.header
      }
    );
  }
}

