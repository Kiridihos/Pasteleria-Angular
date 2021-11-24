import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { AlertHelper } from '../alert-helper';

@Component({
  selector: 'app-empleados-list',
  templateUrl: './empleados-list.component.html',
  styleUrls: ['./empleados-list.component.css']
})
export class EmpleadosListComponent implements OnInit {
  empleados: Empleado[];
  title: string;
  constructor(private empleadoService:EmpleadoService, private router:Router, private activate:ActivatedRoute) {
    this.empleados = [];
    this.title = 'Lista de empleados';
  }

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe(
      empleados => {
        this.empleados = empleados
      }
    );
  }

  delete(empleado:Empleado):void{
    AlertHelper.alertaBorrar().then(
      (result) => {
        if (result.isConfirmed) {
          this.empleadoService.delete(empleado.id!).subscribe(
            response => {
              this.empleados = this.empleados.filter(emp => emp != empleado);
              AlertHelper.alertaGuardar('Borraste un empleado ome');
            }
          );
        }
      }
    );
  }
}
