import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-empleados-list',
  templateUrl: './empleados-list.component.html',
  styleUrls: ['./empleados-list.component.css']
})
export class EmpleadosListComponent implements OnInit {
  empleados:Empleado[];
  constructor(private empleadoService:EmpleadoService, private router:Router, private activate:ActivatedRoute) { 
    this.empleados = [];
  }

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe(
      empleados => {
        this.empleados = empleados
      }
    );
  }

  delete(empleado:Empleado):void{
    Swal.fire(
      {
        title: 'Estás seguro, parce?',
        text: 'Esto no tiene vuelta atrás',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Uy zonas',
        confirmButtonText: 'Sisas'
      }
    ).then(
      (result) => {
        if (result.isConfirmed) {
          this.empleadoService.delete(empleado.id!).subscribe(
            response => {
              this.empleados = this.empleados.filter(emp => emp != empleado);
              Swal.fire(
                {
                  title: 'Eres una chimba',
                  text: 'Borraste un empleado ome',
                  icon: 'success',
                  confirmButtonText: 'Melo'
                }
              );
            }
          );
        }
      }
    );
  }
}
