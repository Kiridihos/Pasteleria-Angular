import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-empleados-form',
  templateUrl: './empleados-form.component.html',
  styleUrls: ['./empleados-form.component.css']
})
export class EmpleadosFormComponent implements OnInit {
  empleado:Empleado;
  constructor(private empleadoService:EmpleadoService, private router:Router, private activate:ActivatedRoute) { 
    this.empleado = new Empleado();
  }

  ngOnInit(): void {
    this.cargarEmpleado();
  }

  create():void{
    this.empleadoService.create(this.empleado).subscribe(
      response => {
        this.router.navigate(['/']);
        Swal.fire(
          {
            title: 'Eres una chimba',
            text: 'Creaste un pastel ome',
            icon: 'success',
            confirmButtonText: 'Melo'
          }
        );
      }
    );
  }
  check():void{
    if(this.checkNull()){
      if(this.checkLetras()){
        this.create();
      }
    }
  }
  checkNull():boolean{
     if(this.empleado.nombres==null){
      Swal.fire(
        {
          title: 'Error',
          text: 'Se necesita un nombre',
          icon: 'error',
          confirmButtonText: 'volver'
        }
      );
      return false;
    }else if(this.empleado.nombres.charAt(0).match(/[\s]/) ||this.empleado.nombres.charAt(this.empleado.nombres.length-1).match(/[\s]/)){
      Swal.fire(
        {
          title: 'Error',
          text: 'Nombre no puede empezar/terminar con espacios',
          icon: 'error',
          confirmButtonText: 'volver'
        }
      );
      return false;
    }else if(this.empleado.apellidos==null){
      Swal.fire(
        {
          title: 'Error',
          text: 'Se necesita un apellido',
          icon: 'error',
          confirmButtonText: 'volver'
        }
      );
      return false;
    }else if(this.empleado.apellidos.charAt(0).match(/[\s]/ ||this.empleado.apellidos.charAt(this.empleado.apellidos.length-1).match(/[\s]/))){
      Swal.fire(
        {
          title: 'Error',
          text: 'Apellido no puede empezar con un espacio',
          icon: 'error',
          confirmButtonText: 'volver'
        }
      );
      return false;
    }else if(this.empleado.salarioActual==null){
      Swal.fire(
        {
          title: 'Error',
          text: 'Se necesita un salario',
          icon: 'error',
          confirmButtonText: 'volver'
        }
      );
      return false;
    }
    return true;
  }
  checkLetras():boolean{
    var alphaExp = /^[a-zA-Za\s]+$/;
    if(!this.empleado.nombres?.match(alphaExp)){
      Swal.fire(
        {
          title: 'Error',
          text: 'El nombre solo puede tener letras',
          icon: 'error',
          confirmButtonText: 'volver'
        }
      );
      return false;
    }else if(!this.empleado.apellidos?.match(alphaExp)){
      Swal.fire(
        {
          title: 'Error',
          text: 'Los apellidos solo puede tener letras',
          icon: 'error',
          confirmButtonText: 'volver'
        }
      );
      return false;
    }
    return true;
  }
  cargarEmpleado(){

  }

}
