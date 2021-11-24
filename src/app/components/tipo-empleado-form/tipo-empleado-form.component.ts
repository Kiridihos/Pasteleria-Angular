import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoEmpleado } from 'src/app/models/tipo-empleado';
import {TipoEmpleadoService } from 'src/app/services/tipo-empleado.service';


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
        Swal.fire(
          {
            title: 'Nea eres una chimba ',
            text: 'Creaste un tipo de empleado ome',
            icon: 'success',
            confirmButtonText: 'Melo'
          }
        );
      }
    );
  }

  alertaCheck(mensaje: string) {
    Swal.fire({
      title: 'Error en los campos del formulario',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Uy, zonas'
    });
  }
  check(another?:boolean):void{
    if(this.isCheckInputs()){
      this.create(another);
    }
  }
  isCheckInputs():boolean{
    var alphaExp = /^[a-zA-Za\s]+$/
    if(this.tipoEmpleado.descripcion==null){
      this.alertaCheck('¿Se te olvidó diligenciar algún campo, mijo?');
      return false;
    }else if(this.tipoEmpleado.descripcion.charAt(0).match(/[\s]/) || this.tipoEmpleado.descripcion.charAt(this.tipoEmpleado.descripcion.length-1).match(/[\s]/)){
      this.alertaCheck('¿Pusiste espacios antes de los valores, mijo?');
      return false;
    }
    return true;
  }
}
