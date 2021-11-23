import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { TipoEmpleado } from '../models/tipo-empleado';

@Injectable({
  providedIn: 'root'
})
export class TipoEmpleadoService {
  private urlEndPoint = 'http://localhost:8081/api/tipo_empleado/';
  private header = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private http:HttpClient) { }

  getEmpleados(): Observable<TipoEmpleado[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as TipoEmpleado[])
    );
  }

  getEmpleado(id:string): Observable<TipoEmpleado>{
    return this.http.get<TipoEmpleado>(
      this.urlEndPoint + id
    );
  }

  create(tipoEmpleado:TipoEmpleado): Observable<TipoEmpleado>{
    return this.http.post<TipoEmpleado>(
      this.urlEndPoint,
      tipoEmpleado,
      {
        headers: this.header
      }
    );
  }

  delete(id:number): Observable<TipoEmpleado>{
    return this.http.delete<TipoEmpleado>(
      this.urlEndPoint + id.toString(),
      {
        headers: this.header
      }
    );
  }
}

