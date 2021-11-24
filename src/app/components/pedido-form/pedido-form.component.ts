import { PedidoService } from './../../services/pedido.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.css']
})
export class PedidoFormComponent implements OnInit {
  pedido:Pedido;
  title:string;
  empleado:Empleado[];
  constructor(private PedidoService:PedidoService, private empleadoService:EmpleadoService, private router:Router, private activate:ActivatedRoute) { 
    this.pedido = new Pedido();
    this.empleado = [];
    this.title = '';
  }

  ngOnInit(): void {
    this.cargarPedido();
    this.getEmpleado();
  }

  getEmpleado():void{
    this.empleadoService.getEmpleados().subscribe(
      empleado => this.empleado = empleado
    );
  }

  create():void{
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
