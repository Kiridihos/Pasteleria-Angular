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
            title: 'Eres una chimba',
            text: 'Creaste un empleado ome',
            icon: 'success',
            confirmButtonText: 'Melo'
          }
        );
      }
    );
  }
}
