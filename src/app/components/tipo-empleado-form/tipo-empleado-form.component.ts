import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoEmpleado } from 'src/app/models/tipo-empleado';
import {TipoEmpleadoService } from 'src/app/services/tipo-empleado.service';
import { AlertHelper } from '../alert-helper';
import { ValidationHelper } from '../validation-helper';


@Component({
  selector: 'app-tipo-empleado-form',
  templateUrl: './tipo-empleado-form.component.html',
  styleUrls: ['./tipo-empleado-form.component.css']
})
export class TipoEmpleadoFormComponent implements OnInit {
  tipoEmpleado: TipoEmpleado;
  title: string;
  constructor(private tipoEmpleadoService:TipoEmpleadoService, private router:Router, private activate:ActivatedRoute) {
    this.tipoEmpleado = new TipoEmpleado();
    this.title = 'Registrar tipo de empleado'
  }

  ngOnInit(): void {
  }

  create(another?:boolean):void{
    this.tipoEmpleadoService.create(this.tipoEmpleado).subscribe(
      response => {
        if (another) {
          this.router.navigate(['/tipos_empleado/new']);
          this.tipoEmpleado = new TipoEmpleado();
        } else {
          this.router.navigate(['/']);
        }
        AlertHelper.alertaGuardar('Creaste un tipo de empleado ome');
      }
    );
  }

  check(another?:boolean):void{
    if(this.isCheckInputs()){
      this.create(another);
    }
  }
  isCheckInputs():boolean{
    if (ValidationHelper.empty(this.tipoEmpleado)) {
      AlertHelper.alertaCheck('¿Se te olvidó diligenciar algún campo, mijo?');
      return false;
    }
    else if (ValidationHelper.spaces(this.tipoEmpleado)) {
      AlertHelper.alertaCheck('¿Pusiste espacios antes o después de los valores, mijo?');
      return false;
    }
    else if (ValidationHelper.numbers(this.tipoEmpleado.descripcion)) {
      AlertHelper.alertaCheck('¿Pusiste un número en la descripción, mijo?');
      return false;
    }
    return true;
  }
}
