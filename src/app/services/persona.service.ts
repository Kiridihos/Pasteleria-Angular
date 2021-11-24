import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private urlEndPoint = 'https://pasteleria-hk-api.herokuapp.com/api/personas/';
  private header = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private http:HttpClient) { }

  delete(id:string):Observable<Persona>{
    return this.http.delete<Persona>(
      this.urlEndPoint + id,
      {
        headers: this.header
      }
    );
  }
}
