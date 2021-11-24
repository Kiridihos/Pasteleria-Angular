import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from './../../services/pedido.service';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Pastel } from 'src/app/models/pastel';
import { PastelService } from 'src/app/services/pastel.service';
import { TipoPastel } from 'src/app/models/tipo-pastel';
import { TipoPastelService } from './../../services/tipo-pastel.service';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
import { PersonaExterna } from 'src/app/models/persona-externa';
import { PersonaExternaService } from 'src/app/services/persona-externa.service';
import { PersonaService } from 'src/app/services/persona.service';
import { AlertHelper } from '../alert-helper';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.css']
})
export class PedidoFormComponent implements OnInit {
  pastelDialog: boolean;
  pedido:Pedido;
  title: string;
  fecha: string;
  pastel: Pastel;
  empleados: Empleado[];
  pasteles: Pastel[];
  tiposPastel: TipoPastel[];
  personas: PersonaExterna[];
  empresas: Empresa[];
  pastelesCreados: Pastel[];
  pedidoCreado: Pedido;
  constructor(private PedidoService: PedidoService,
    private empleadoService: EmpleadoService,
    private tipoPastelService: TipoPastelService,
    private pastelService: PastelService,
    private personaService: PersonaExternaService,
    private empresaService: EmpresaService,
    private personasService: PersonaService,
    private router: Router,
    private activate: ActivatedRoute) {
    this.pedido = new Pedido();
    this.pastel = new Pastel();
    this.pedidoCreado = new Pedido();
    this.empleados = [];
    this.pasteles = [];
    this.tiposPastel = [];
    this.personas = [];
    this.empresas = [];
    this.pastelesCreados = [];
    this.title = '';
    this.fecha = '';
    this.pastelDialog = false;
  }

  ngOnInit(): void {
    this.cargarPedido();
    this.getEmpleados();
    this.getPersonas();
    this.getEmpresas();
    this.getTipos();
  }

  getTipos():void{
    this.tipoPastelService.getTipos().subscribe(
      tiposPastel => this.tiposPastel = tiposPastel
    );
  }

  getPersonas(): void{
    this.personaService.getPersonasExternas().subscribe(
      personas => this.personas = personas
    );
  }

  getEmpresas(): void{
    this.empresaService.getEmpresas().subscribe(
      empresas => this.empresas = empresas
    );
  }

  getEmpleados():void{
    this.empleadoService.getEmpleados().subscribe(
      empleados => this.empleados = empleados
    );
  }

  showPastelDialog(): void {
    this.pastelDialog = true;
  }

  closeDialog(): void{
    this.pastelDialog = false;
  }

  addPastel(pastel: Pastel) {
    this.pasteles.push(pastel);
    this.pastel = new Pastel();
    this.pastelDialog = false;
  }

  borrarPastel(pastel: Pastel) {
    let index = this.pasteles.findIndex(
      pastelAux => pastelAux.nombre === pastel.nombre &&
        pastelAux.pesoMin === pastel.pesoMin &&
        pastelAux.tipo === pastel.tipo &&
        pastelAux.adicional === pastel.adicional
    );
    if (!isNaN(index)) {
      this.pasteles.splice(index, 1);
      this.pasteles = this.pasteles.filter(obj => obj !== pastel);
      console.log(this.pasteles.length);
    }
  }

  processDate():string{
    let fecha = '';
    let fechaAnt = new Date(this.fecha);
    let fechaString = fechaAnt.toDateString();
    let y = fechaAnt.getFullYear().toString();
    fecha += y;
    fecha += '-';
    let m = fechaAnt.getMonth().toString();
    fecha += m;
    fecha += '-';
    let d = fechaAnt.getDay().toString();
    fecha += y;
    fecha += ' 00:00:00'
    return fecha;
  }

  guardarPasteles(): void{
    this.pasteles.forEach(
      pastel => {
        this.pastelService.create(pastel).subscribe(
          response => {
            this.pastelesCreados.push(response);
          }
        );
      }
    );
  }

  asignarPasteles(): void{
    this.pastelesCreados.forEach(
      pastel => {
        pastel.pedido = this.pedidoCreado;
        this.pastelService.update(pastel);
      }
    );
  }

  asignarPersona(): void {
    console.log(this.pedido.cliente);
  }

  create(): void{
    this.guardarPasteles();
    this.pedido.fechaEntrega = this.processDate();
    this.asignarPersona();
    this.PedidoService.create(this.pedido).subscribe(
      response => {
        this.pedidoCreado = response;
        this.asignarPasteles();
        this.router.navigate(['/']);
        AlertHelper.alertaGuardar('Creaste un pedido ome')
      }
    );
  }
  cargarPedido():void{
    this.activate.params.subscribe(
      params => {
        let id = params['id'];
        if (id) {
          this.PedidoService.getPedido(id).subscribe(
            pedido => this.pedido = pedido
          );
          this.title = 'Editar Pedido';
        }
        else {
          this.title = 'Registrar Pedido';
        }
      }
    );
  }
}
