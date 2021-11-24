import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
import { PersonaExternaService } from 'src/app/services/persona-externa.service';
import { PersonaExterna } from 'src/app/models/persona-externa';
import { AlertHelper } from '../alert-helper';
import { ValidationHelper } from '../validation-helper';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {
  title: string;
  fechaNac:Date;
  empresa: Empresa;
  persona: PersonaExterna;
  tiposCliente: any[];
  selected: string;
  opcion:string;
  constructor(private empresaService:EmpresaService,
    private personaService:PersonaExternaService,
    private router:Router, private activate: ActivatedRoute)
    {
      this.fechaNac = new Date();
      this.empresa = new Empresa();
      this.persona = new PersonaExterna();
      this.tiposCliente = ['Empresa', 'Persona externa']
      this.selected = '';
    this.opcion = '';
    this.title = '';
    }

  ngOnInit(): void {
    this.cargarCliente();
  }

  selectedType():void{
    this.selected = this.opcion;
    console.log(this.selected);
  }

  esNumero(value:string|number):boolean{
    return ((value != null) && (value !== '') &&
      !isNaN(Number(value.toString())));
  }

  cargarCliente():void{
    this.activate.params.subscribe(
      params => {
        let tipo = params['tipo'];
        console.log(tipo);
        let identificador = params['id'];
        console.log(identificador);
        if (tipo === 'empresa') {
          this.empresaService.getEmpresa(identificador).subscribe(
            empresa => this.empresa = empresa
          );
          console.log(this.empresa);
          this.selected = 'Empresa';
          this.title = 'Editar Empresa'
        }
        else if (tipo === 'persona') {
          this.personaService.getPersonaExterna(identificador).subscribe(
            persona => this.persona = persona
          );
          console.log(this.persona);
          this.selected = 'Persona externa';
          this.title = 'Editar Persona Externa';
        }
        else {
          this.title = 'Registrar cliente';
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
        if (this.empresa.id) {
          AlertHelper.alertaGuardar('Guardaste la empresa, parcero');
        }
        else {
          AlertHelper.alertaGuardar('Registraste una empresa ome');
        }
      }
    );
  }

  processDate():string{
    let fecha = '';
    let fechaAnt = new Date(this.fechaNac);
    let fechaString = fechaAnt.toDateString();
    let y = fechaAnt.getFullYear().toString();
    fecha += y;
    fecha += '-';
    let m = fechaAnt.getMonth().toString();
    fecha += m;
    fecha += '-'
    let d = fechaAnt.getDay().toString();
    fecha += y;
    fecha += ' 00:00:00'
    console.log(fecha);
    return fecha;
  }

  crearPersona():void{
    this.personaService.create(this.persona).subscribe(
      response => {
        this.router.navigate(['/']);
        if (this.persona.id) {
          AlertHelper.alertaGuardar('Guardaste la persona externa, parcero');
        }
        else {
          AlertHelper.alertaGuardar('Registraste una persona externa ome');
        }
      }
    );
  }

  checkEmpresa():void{
    if (this.isCheckEmpresaInputs()) {
      this.crearEmpresa();
    }
  }

  isCheckEmpresaInputs():boolean{
    if (ValidationHelper.empty(this.empresa)) {
      AlertHelper.alertaCheck('¿Se te olvidó diligenciar algún campo, mijo?');
      return false;
    }
    else if (
      ValidationHelper.spaces(this.empresa)
    ) {
      AlertHelper.alertaCheck('¿Ingresaste espacios antes o después de los valores, mijo?');
      return false;
    }
    return true;
  }

  checkPersona():void {
    if (this.isCheckPersonaInputs()) {
      this.crearPersona();
    }
  }

  isCheckPersonaInputs():boolean{
    this.persona.fechaNac = this.processDate();
    if (ValidationHelper.empty(this.persona)){
      AlertHelper.alertaCheck('¿Se te olvidó diligenciar algún campo, mijo?');
      return false;
    }
    else if (ValidationHelper.spaces(this.persona)) {
      AlertHelper.alertaCheck('¿Ingresaste espacios antes o después de los valores, mijo?');
      return false;
    }
    else if (ValidationHelper.numbers(this.persona.nombres) ||
      ValidationHelper.numbers(this.persona.apellidos)) {
      AlertHelper.alertaCheck('¿Pusiste números en un nombre o apellido, mijo?');
      return false;
    }
    else {
      return true;
    }
  }
}
