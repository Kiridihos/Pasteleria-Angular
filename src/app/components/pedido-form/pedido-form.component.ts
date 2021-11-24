import { TipoPastelService } from './../../services/tipo-pastel.service';
import { PedidoService } from './../../services/pedido.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Pastel } from 'src/app/models/pastel';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { TipoPastel } from 'src/app/models/tipo-pastel';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.css']
})
export class PedidoFormComponent implements OnInit {
  pastelDialog: boolean;
  pedido:Pedido;
  title: string;
  pastel: Pastel;
  empleados: Empleado[];
  pasteles: Pastel[];
  tiposPastel:TipoPastel[];
  constructor(private PedidoService: PedidoService,
    private empleadoService: EmpleadoService, private tipoPastelService:TipoPastelService,
    private router: Router,
    private activate: ActivatedRoute) {
    this.pedido = new Pedido();
    this.pastel = new Pastel();
    this.empleados = [];
    this.pasteles = [];
    this.title = '';
    this.pastelDialog = false;
    this.tiposPastel = [];
  }

  ngOnInit(): void {
    this.cargarPedido();
    this.getEmpleado();
  }

  getTipos():void{
    this.tipoPastelService.getPasteles().subscribe(
      tiposPastel => this.tiposPastel = tiposPastel
    );
  }


  getEmpleado():void{
    this.empleadoService.getEmpleados().subscribe(
      empleados => this.empleados = empleados
    );
  }

  showPastelDialog(): void {
    console.log('Click');
    this.pastelDialog = true;
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

  guardarPasteles(): void{
    for (const pastel in this.pasteles) {

    }
  }

  create(): void{
    this.guardarPasteles();
    this.PedidoService.create(this.pedido).subscribe(
      response => {
        this.router.navigate(['/']);
        Swal.fire(
          {
            title: 'Eres una chimba',
            text: 'Creaste un orden ome',
            icon: 'success',
            confirmButtonText: 'Melo'
          }
        );
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
          this.title = 'Editar Orden';
        }
        else {
          this.title = 'Registrar Orden';
        }
      }
    );
  }
}
