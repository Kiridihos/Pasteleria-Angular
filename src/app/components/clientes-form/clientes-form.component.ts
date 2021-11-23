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
  checkEmpresa():void{
    if(this.isCheckEmpresaInputs()){
      this.crearEmpresa();
    }
  }
  isCheckEmpresaInputs():boolean{
    var alphaExp = /^[a-zA-Za\s]+$/
    if(this.empresa.nit==null||this.empresa.nombre==null||this.empresa.direccion==null){
      Swal.fire(
        {
          title: 'CAMPOS VACIOS',
          text: 'no pueden haber campos vacios',
          icon: 'error',
          confirmButtonText: 'Volver'
        }
      );
      return false;
    }else if(this.empresa.nombre?.charAt(0).match(/[\s]/) 
    || this.empresa.nombre?.charAt( this.empresa.nombre.length-1).match(/[\s]/)
    || this.empresa.direccion?.charAt(0).match(/[\s]/) 
    || this.empresa.direccion?.charAt( this.empresa.direccion.length-1).match(/[\s]/)){
      Swal.fire(
        {
          title: 'CAMPOS CON ESPACIOS',
          text: 'los campos no pueden empezar/terminar con espacios',
          icon: 'error',
          confirmButtonText: 'Volver'
        }
      );
      return false;
    }else if(! this.empresa.nombre.match(alphaExp)){
      Swal.fire(
        {
          title: 'VALORES INVALIDOS',
          text: 'El nombre solo pueden tener letras',
          icon: 'error',
          confirmButtonText: 'Volver'
        }
      );
      return false;
    }
    return true;
  }
  checkPersona():void{
      if(this.isCheckPersonaInputs()) {
        this.crearPersona();
      }
    }
  
  isCheckPersonaInputs():boolean{
    var alphaExp = /^[a-zA-Za\s]+$/;
    if(this.persona.cedula==null||this.persona.nombres==null||this.persona.apellidos==null
        ||this.persona.dir==null||this.persona.fechaNac==null ){
      Swal.fire(
        {
          title: 'CAMPOS VACIOS',
          text: 'no pueden haber campos vacios',
          icon: 'error',
          confirmButtonText: 'Volver'
        }
      );
      return false;
    }else if(this.persona.nombres?.charAt(0).match(/[\s]/) 
    ||this.persona.nombres?.charAt( this.persona.nombres.length-1).match(/[\s]/)
    ||this.persona.apellidos?.charAt(0).match(/[\s]/) 
    ||this.persona.apellidos?.charAt( this.persona.apellidos.length-1).match(/[\s]/)
    ||this.persona.dir?.charAt(0).match(/[\s]/) 
    ||this.persona.dir?.charAt( this.persona.dir.length-1).match(/[\s]/)
      ){Swal.fire(
        {
          title: 'CAMPOS CON ESPACIOS',
          text: 'los campos no pueden empezar/terminar con espacios',
          icon: 'error',
          confirmButtonText: 'Volver'
        }
      );
      return false;
    }else if(! this.persona.nombres.match(alphaExp) || !this.persona.apellidos.match(alphaExp)){
      Swal.fire(
        {
          title: 'VALORES INVALIDOS',
          text: 'nombre/apellidos solo pueden tener letras',
          icon: 'error',
          confirmButtonText: 'Volver'
        }
      );
      return false;
    }else{
      return true;     
    }
  }
}
