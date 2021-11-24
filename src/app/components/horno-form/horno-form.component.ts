import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Horno } from 'src/app/models/horno';
import {HornoService } from 'src/app/services/horno.service';
import { AlertHelper } from '../alert-helper';
import { ValidationHelper } from '../validation-helper';

@Component({
  selector: 'app-horno-form',
  templateUrl: './horno-form.component.html',
  styleUrls: ['./horno-form.component.css']
})
export class HornoFormComponent implements OnInit {
  horno: Horno;
  title: string;
  constructor(private hornoService:HornoService, private router:Router, private activate:ActivatedRoute) {
    this.horno = new Horno();
    this.title = 'Registrar horno';
  }

  ngOnInit(): void {
    this.cargarHorno();
  }

  create(another?:boolean):void{
    this.hornoService.create(this.horno).subscribe(
      response => {
        if (another) {
          this.router.navigate(['/hornos/new']);
          this.horno = new Horno();
        }
        else {
          this.router.navigate(['/']);
        }
        AlertHelper.alertaGuardar('Creaste un horno ome');
      }
    );
  }

  cargarHorno():void{
    this.activate.params.subscribe(
      params => {
        let id = params['id'];
        if (id) {
          this.hornoService.getHorno(id).subscribe(
            horno => this.horno = horno
          );
        }
      }
    );
  }

  check(another?:boolean):void{
    if(this.isCheckInputs()){
      this.create(another);
    }
  }

  isCheckInputs():boolean{
    if (ValidationHelper.empty(this.horno)) {
      AlertHelper.alertaCheck('¿Se te olvidó diligenciar algún campo, mijo?');
      return false;
    }
    else if (ValidationHelper.spaces(this.horno.marca)){
      AlertHelper.alertaCheck('¿Pusiste espacios antes o después de los valores, mijo?');
      return false;
    }
    return true;
  }
}

