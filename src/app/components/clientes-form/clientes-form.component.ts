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
    this.title = 'Registrar cliente';
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
        let identificador = params['nit'];
        if (identificador) {
          if (this.esNumero(identificador)) {
            this.empresaService.getEmpresa(identificador).subscribe(
              empresa => this.empresa = empresa
            );
            this.selected = 'Empresa';
          }
          else {
            this.personaService.getPersonaExterna(identificador).subscribe(
              persona => this.persona = persona
            );
            console.log(this.persona);
            this.selected = 'Persona externa';
          }
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
        Swal.fire(
          {
            title: 'Eres una chimba',
            text: 'Registraste una persona externa ome',
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
  alertaCheck(mensaje: string) {
    Swal.fire({
      title: 'Error en los campos del formulario',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Uy, zonas'
    });
  }
  isCheckEmpresaInputs():boolean{
    var alphaExp = /^[a-zA-Za\s]+$/
    if(this.empresa.nit==null||this.empresa.nombre==null||this.empresa.direccion==null){
      this.alertaCheck('¿Se te olvidó diligenciar algún campo, mijo?');
      return false;
    }else if(this.empresa.nombre?.charAt(0).match(/[\s]/)
    || this.empresa.nombre?.charAt( this.empresa.nombre.length-1).match(/[\s]/)
    || this.empresa.direccion?.charAt(0).match(/[\s]/)
    || this.empresa.direccion?.charAt( this.empresa.direccion.length-1).match(/[\s]/)){
      this.alertaCheck('¿Ingresaste espacios antes de los valores, mijo?');
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
    this.persona.fechaNac = this.processDate();
    var alphaExp = /^[a-zA-Za\s]+$/;
    if(this.persona.cedula==null||this.persona.nombres==null||this.persona.apellidos==null
        ||this.persona.dir==null||this.persona.fechaNac==null ){
          this.alertaCheck('¿Se te olvidó diligenciar algún campo, mijo?');
      return false;
    }else if(this.persona.nombres?.charAt(0).match(/[\s]/)
    ||this.persona.nombres?.charAt( this.persona.nombres.length-1).match(/[\s]/)
    ||this.persona.apellidos?.charAt(0).match(/[\s]/)
    ||this.persona.apellidos?.charAt( this.persona.apellidos.length-1).match(/[\s]/)
    ||this.persona.dir?.charAt(0).match(/[\s]/)
    ||this.persona.dir?.charAt( this.persona.dir.length-1).match(/[\s]/)
    ) {
      this.alertaCheck('¿Ingresaste espacios antes de los valores, mijo?');
      return false;
    }else if(! this.persona.nombres.match(alphaExp) || !this.persona.apellidos.match(alphaExp)){
      this.alertaCheck('¿Pusiste números en un nombre o apellido, mijo?');
      return false;
    }else{
      return true;
    }
  }
}
