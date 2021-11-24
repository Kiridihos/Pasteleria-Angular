import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { TipoEmpleado } from 'src/app/models/tipo-empleado';
import { TipoEmpleadoService } from 'src/app/services/tipo-empleado.service';

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
        Swal.fire(
          {
            title: 'Eres una chimba',
            text: 'Creaste un empleado ome',
            icon: 'success',
            confirmButtonText: 'Melo'
          }
        );
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
    var alphaExp = /^[a-zA-Za\s]+$/
    if(this.empleado.nombres==null ||this.empleado.apellidos==null ||this.empleado.salarioActual==null){
      Swal.fire(
        {
          title: 'CAMPOS VACIOS',
          text: 'no pueden haber campos vacios',
          icon: 'error',
          confirmButtonText: 'Volver'
        }
      );
      return false;
    }else if (this.empleado.nombres?.charAt(0).match(/[\s]/)
      ||this.empleado.nombres?.charAt(this.empleado.nombres.length-1).match(/[\s]/)
      ||this.empleado.apellidos?.charAt(0).match(/[\s]/)
      ||this.empleado.apellidos?.charAt(this.empleado.apellidos.length-1).match(/[\s]/) ){
        Swal.fire(
          {
            title: 'CAMPOS CON ESPACIOS',
            text: 'los campos no pueden empezar/terminar con espacios',
            icon: 'error',
            confirmButtonText: 'Volver'
          }
        );
        return false;
    }else if(!this.empleado.nombres.match(alphaExp) || !this.empleado.apellidos.match(alphaExp)){
      Swal.fire(
        {
          title: 'VALORES INVALIDOS',
          text: 'nombres/apellidos solo pueden tener letras',
          icon: 'error',
          confirmButtonText: 'Volver'
        }
      );
      return false;
    }
    return true;
  }

}
