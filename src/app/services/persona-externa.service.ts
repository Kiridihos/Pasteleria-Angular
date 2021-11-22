import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { PersonaExterna } from '../models/persona-externa';


@Injectable({
  providedIn: 'root'
})
export class PersonaExternaService {
  private urlEndPoint = 'http://localhost:8081/api/persona_externa/';
  private header = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  getPersonasExternas(): Observable<PersonaExterna[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as PersonaExterna[])
    );
  }

  getPersonaExterna(id:string):Observable<PersonaExterna>{
    return this.http.get<PersonaExterna>(
      this.urlEndPoint + id
    );
  } 

  create(personaExterna:PersonaExterna): Observable<PersonaExterna>{
    return this.http.post<PersonaExterna>(
      this.urlEndPoint,
      personaExterna,
      {
        headers: this.header
      }
    );
  }
}
