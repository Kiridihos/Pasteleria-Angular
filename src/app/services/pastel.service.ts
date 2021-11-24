import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pastel } from '../models/pastel';

@Injectable({
  providedIn: 'root'
})
export class PastelService {
  private urlEndPoint = 'http://localhost:8081/api/pasteles/';
  private header = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private http:HttpClient) { }

  getPasteles(): Observable<Pastel[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as Pastel[])
    );
  }

  getPastel(id:string): Observable<Pastel>{
    return this.http.get<Pastel>(
      this.urlEndPoint + id
    );
  }

  create(pastel:Pastel): Observable<Pastel>{
    return this.http.post<Pastel>(
      this.urlEndPoint,
      pastel,
      {
        headers: this.header
      }
    );
  }

  delete(id:string): Observable<Pastel>{
    return this.http.delete<Pastel>(
      this.urlEndPoint + id,
      {
        headers: this.header
      }
    );
  }
}
