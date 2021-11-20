import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private urlEndPoint = 'http://localhost:8080/api/empleados';
  private header = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private http:HttpClient) { }

  getEmpleados(): Observable<Empleado[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as Empleado[])
    );
  }

  getEmpleado(id:string): Observable<Empleado>{
    return this.http.get<Empleado>(
      this.urlEndPoint + id
    );
  }

  create(empleado:Empleado): Observable<Empleado>{
    return this.http.post<Empleado>(
      this.urlEndPoint,
      empleado,
      {
        headers: this.header
      }
    );
  }
}
