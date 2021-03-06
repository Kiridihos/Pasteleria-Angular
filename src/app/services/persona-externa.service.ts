import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { PersonaExterna } from '../models/persona-externa';


@Injectable({
  providedIn: 'root'
})
export class PersonaExternaService {
  private urlEndPoint = 'https://pasteleria-hk-api.herokuapp.com/api/persona_externa/';
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
    let result = this.http.get<PersonaExterna>(
      this.urlEndPoint + id
    );
    result.subscribe(
      val => console.log(val)
    );
    return result;
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

  delete(id:string): Observable<PersonaExterna>{
    return this.http.delete<PersonaExterna>(
      this.urlEndPoint + id.toString(),
      {
        headers: this.header
      }
    );
  }
}
