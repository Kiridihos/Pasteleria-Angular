import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
import { PersonaExternaService } from 'src/app/services/persona-externa.service';
import { PersonaExterna } from 'src/app/models/persona-externa';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {
  empresa: Empresa;
  persona: PersonaExterna;
  tiposCliente: any[];
  selected: string;
  opcion:string;
  constructor(private empresaService:EmpresaService,
    private personaService:PersonaExternaService,
    private router:Router, private activate: ActivatedRoute) 
    { 
      this.empresa = new Empresa();
      this.persona = new PersonaExterna();
      this.tiposCliente = ['Empresa', 'Persona externa']
      this.selected = '';
      this.opcion = '';
    }

  ngOnInit(): void {
    this.cargarEmpresa();
  }

  selectedType():void{
    this.selected = this.opcion;
    console.log(this.selected);
  }

  cargarEmpresa():void{
    this.activate.params.subscribe(
      params => {
        let nit = params['nit'];
        if (nit) {
          this.empresaService.getEmpresa(nit).subscribe(
            empresa => this.empresa = empresa
          );
        }
      }
    );
  }

  cargarPersona():void{
    this.activate.params.subscribe(
      params => {
        let id = params['id'];
        if (id) {
          this.personaService.getPersonaExterna(id).subscribe(
            persona => this.persona = persona
          );
        }
      }
    );
  }

  crearEmpresa():void{
    this.empresaService.create(this.empresa).subscribe(
      response => {
        this.router.navigate(['/']);
        Swal.fire(
          {
            title: 'Eres una chimba',
            text: 'Registraste una empresa ome',
            icon: 'success',
            confirmButtonText: 'Melo'
          }
        );
      }
    );
  }

  crearPersona():void{
    this.personaService.create(this.persona).subscribe(
      response => {
        this.router.navigate(['/']);
        Swal.fire(
          {
            title: 'Eres una chimba',
            text: 'Registraste una persona ome',
            icon: 'success',
            confirmButtonText: 'Melo'
          }
        );
      }
    );
  }

}
