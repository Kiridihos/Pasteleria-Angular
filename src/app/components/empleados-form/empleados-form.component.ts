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
  tipos:TipoEmpleado[];
  constructor(private empleadoService:EmpleadoService, private tipoService:TipoEmpleadoService, private router:Router, private activate:ActivatedRoute) { 
    this.empleado = new Empleado();
    this.tipos = [];
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

  create():void{
    this.empleadoService.create(this.empleado).subscribe(
      response => {
        this.router.navigate(['/']);
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

  }

}
