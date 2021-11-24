import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { PersonaExterna } from 'src/app/models/persona-externa';
import { PersonaExternaService } from 'src/app/services/persona-externa.service';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
import { AlertHelper } from '../alert-helper';

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

  deleteEmpleado(empleado: Empleado): void{
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

  deleteEmpresa(empresa:Empresa):void{
    AlertHelper.alertaBorrar().then(
      (result) => {
        if (result.isConfirmed) {
          this.empresaService.delete(empresa.nit!).subscribe(
            response => {
              this.empresas = this.empresas.filter(empr => empr != empresa);
              AlertHelper.alertaGuardar('Borraste una empresa ome');
            }
          );
        }
      }
    );
  }

  deletePersonaExterna(personaExterna:PersonaExterna):void{
    AlertHelper.alertaBorrar().then(
      (result) => {
        if (result.isConfirmed) {
          this.personaExternaService.delete(personaExterna.id!).subscribe(
            response => {
              this.personas = this.personas.filter(per => per != personaExterna);
              AlertHelper.alertaGuardar('Borraste una persona externa ome');
            }
          );
        }
      }
    );
  }


}
