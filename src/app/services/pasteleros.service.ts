import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Pastelero } from '../models/Pastelero';

@Injectable({
  providedIn: 'root'
})
export class PastelerosService {
  private urlEndPoint = '';
  private header = new HttpHeaders(
    {
      'Content-type': 'application/json'
    }
  );
  constructor(private http:HttpClient) { }

  // Implementar metodos de consumo de api
}
