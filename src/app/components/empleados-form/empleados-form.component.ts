import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { TipoEmpleado } from 'src/app/models/tipo-empleado';
import { TipoEmpleadoService } from 'src/app/services/tipo-empleado.service';
import { AlertHelper } from '../alert-helper';
import { ValidationHelper } from '../validation-helper';

@Component({
  selector: 'app-empleados-form',
  templateUrl: './empleados-form.component.html',
  styleUrls: ['./empleados-form.component.css']
})
export class EmpleadosFormComponent implements OnInit {
  empleado:Empleado;
  title:string;
  tipos:TipoEmpleado[];
  constructor(private empleadoService:EmpleadoService, private tipoService:TipoEmpleadoService, private router:Router, private activate:ActivatedRoute) {
    this.empleado = new Empleado();
    this.tipos = [];
    this.title = '';
  }

  ngOnInit(): void {
    this.cargarEmpleado();
    this.getTipos();
  }

  getTipos():void{
    this.tipoService.getEmpleados().subscribe(
      tipos => this.tipos = tipos
    );
  }

  create(another?:boolean):void{
    this.empleadoService.create(this.empleado).subscribe(
      response => {
        if (another) {
          this.router.navigate(['/empleados/new']);
          this.empleado = new Empleado();
        }
        else {
          this.router.navigate(['/']);
        }
        if (this.empleado.id) {
          AlertHelper.alertaGuardar('Guardaste el empleado, parcero');
        }
        else {
          AlertHelper.alertaGuardar('Creaste un empleado ome');
        }
      }
    );
  }
  cargarEmpleado():void{
    this.activate.params.subscribe(
      params => {
        let id = params['id'];
        if (id) {
          this.empleadoService.getEmpleado(id).subscribe(
            empleado => this.empleado = empleado
          );
          this.title = 'Editar empleado';
        }
        else {
          this.title = 'Registrar empleado';
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
    if (ValidationHelper.empty(this.empleado)) {
      AlertHelper.alertaCheck('¿Se te olvidó diligenciar algún campo, mijo?');
      return false;
    }
    else if (
      ValidationHelper.spaces(this.empleado)
    ) {
      AlertHelper.alertaCheck('¿Ingresaste espacios antes de los valores, mijo?');
      return false;
    }
    else if (
      ValidationHelper.numbers(this.empleado.nombres) ||
      ValidationHelper.numbers(this.empleado.apellidos)
    ) {
      AlertHelper.alertaCheck('¿Pusiste un número en un nombre o apellido, mijo?');
      return false;
    }
    return true;
  }

}
