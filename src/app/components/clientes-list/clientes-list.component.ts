import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { PersonaExterna } from 'src/app/models/persona-externa';
import { PersonaExternaService } from 'src/app/services/persona-externa.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {
  empleados:Empleado[];
  personaExterna:PersonaExterna[];
  constructor(private empleadoService:EmpleadoService, private router:Router, private activate:ActivatedRoute) { 
    this.empleados = [];
    this.personaExterna = [];
  }

  ngOnInit(): void {
  }

}
