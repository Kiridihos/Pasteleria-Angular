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
  tipoEmpleado:TipoEmpleado;
  constructor(private tipoEmpleadoService:TipoEmpleadoService, private router:Router, private activate:ActivatedRoute) { 
    this.tipoEmpleado = new TipoEmpleado();
  }

  ngOnInit(): void {
  }

  create():void{
    this.tipoEmpleadoService.create(this.tipoEmpleado).subscribe(
      response => {
        this.router.navigate(['/']);
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
  check():void{
    if(this.isCheckInputs()){
      this.create();
    }
  }
  isCheckInputs():boolean{
    var alphaExp = /^[a-zA-Za\s]+$/
    if(this.tipoEmpleado.descripcion==null){
      Swal.fire(
        {
          title: 'CAMPOS VACIOS',
          text: 'no pueden haber campos vacios',
          icon: 'error',
          confirmButtonText: 'Volver'
        }
      );
      return false;
    }else if(this.tipoEmpleado.descripcion.charAt(0).match(/[\s]/) || this.tipoEmpleado.descripcion.charAt(this.tipoEmpleado.descripcion.length-1).match(/[\s]/)){
      Swal.fire(
        {
          title: 'CAMPOS CON ESPACIOS',
          text: 'los campos no pueden empezar/terminar con espacios',
          icon: 'error',
          confirmButtonText: 'Volver'
        }
      );
      return false;
    }else if(!this.tipoEmpleado.descripcion.match(alphaExp)){
      Swal.fire(
        {
          title: 'VALORES INVALIDOS',
          text: 'La descripcion solo puede tener letras',
          icon: 'error',
          confirmButtonText: 'Volver'
        }
      );
      return false;
    }
    return true;
  }
}
