import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierModuleUrl, ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private urlEndPoint = 'https://pasteleria-hk-api.herokuapp.com/api/empresas/';
  private header = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  getEmpresas(): Observable<Empresa[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as Empresa[])
    );
  }

  getEmpresa(id:string):Observable<Empresa>{
    return this.http.get<Empresa>(
      this.urlEndPoint + id
    );
  }

  create(empresa:Empresa): Observable<Empresa>{
    return this.http.post<Empresa>(
      this.urlEndPoint,
      empresa,
      {
        headers: this.header
      }
    );
  }

  delete(id:string): Observable<Empresa>{
    return this.http.delete<Empresa>(
      this.urlEndPoint + id,
      {
        headers: this.header
      }
    );
  }

}
