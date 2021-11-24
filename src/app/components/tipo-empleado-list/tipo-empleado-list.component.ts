import { Component, OnInit } from '@angular/core';
import { TipoEmpleado } from 'src/app/models/tipo-empleado';
import { TipoEmpleadoService } from 'src/app/services/tipo-empleado.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertHelper } from '../alert-helper';

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
    AlertHelper.alertaBorrar().then(
      (result) => {
        if (result.isConfirmed) {
          this.tipoEmpleadoService.delete(tipoEmpleado.id!).subscribe(
            response => {
              this.tipoEmpleados = this.tipoEmpleados.filter(t_emp => t_emp != tipoEmpleado);
              AlertHelper.alertaGuardar('Borraste un tipo de empleado ome');
            }
          );
        }
      }
    );
  }

}
