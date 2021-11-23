import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { PersonaExterna } from 'src/app/models/persona-externa';
import { PersonaExternaService } from 'src/app/services/persona-externa.service';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {
  empleados:Empleado[];
  personas:PersonaExterna[];
  empresas:Empresa[];
  title:string;
  constructor(private empresaService:EmpresaService, 
    private empleadoService:EmpleadoService, 
    private personaExternaService:PersonaExternaService,  
    private router:Router, private activate:ActivatedRoute) { 
    this.empleados = [];
    this.personas = [];
    this.empresas = [];
    this.title = 'Lista de clientes';
  }

  ngOnInit(): void {
    this.empresaService.getEmpresas().subscribe(
      empresas => {
        this.empresas = empresas;
      }
    );
  }

  loadEmpresas():void{
    this.personas = [];
    this.empleados = [];
    this.empresaService.getEmpresas().subscribe(
      empresas => {
        this.empresas = empresas;
      }
    );
  }

  loadPersonas():void{
    this.empresas = [];
    this.empleados = [];
    this.personaExternaService.getPersonasExternas().subscribe(
      personas => {
        this.personas = personas;
      }
    );
  }

  loadEmpleados():void{
    this.personas = [];
    this.empresas = [];
    this.empleadoService.getEmpleados().subscribe(
      empleados => {
        this.empleados = empleados;
        console.log(this.empleados);
      }
    );
  }

  deleteEmpleado(empleado:Empleado):void{
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
