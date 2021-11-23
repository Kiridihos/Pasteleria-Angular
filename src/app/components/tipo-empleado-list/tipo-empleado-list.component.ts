import { Component, OnInit } from '@angular/core';
import { TipoEmpleado } from 'src/app/models/tipo-empleado';
import { TipoEmpleadoService } from 'src/app/services/tipo-empleado.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-empleado-list',
  templateUrl: './tipo-empleado-list.component.html',
  styleUrls: ['./tipo-empleado-list.component.css']
})
export class TipoEmpleadoListComponent implements OnInit {

  tipoEmpleados:TipoEmpleado[];
  constructor(private tipoEmpleadoService:TipoEmpleadoService, private router:Router, private activate:ActivatedRoute) { 
    this.tipoEmpleados = [];
  }

  ngOnInit(): void {
    this.tipoEmpleadoService.getEmpleados().subscribe(
      tipoEmpleados => {
        this.tipoEmpleados = tipoEmpleados
      }
    );
  }

  delete(tipoEmpleado:TipoEmpleado):void{
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
          this.tipoEmpleadoService.delete(tipoEmpleado.id!).subscribe(
            response => {
              this.tipoEmpleados = this.tipoEmpleados.filter(t_emp => t_emp != tipoEmpleado);
              Swal.fire(
                {
                  title: 'Eres una chimba',
                  text: 'Borraste un tipo de empleado ome',
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
