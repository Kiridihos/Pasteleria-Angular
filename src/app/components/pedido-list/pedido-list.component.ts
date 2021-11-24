import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { AlertHelper } from '../alert-helper';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css']
})
export class PedidoListComponent implements OnInit {
  pedidos:Pedido[];
  constructor(private pedidoService:PedidoService, private router:Router, private activate:ActivatedRoute) {
    this.pedidos = [];
  }



  ngOnInit(): void {
    this.pedidoService.getPedidos().subscribe(
      pedidos => {
        this.pedidos = pedidos
      }
    );
  }

  delete(pedido:Pedido):void{
    AlertHelper.alertaBorrar().then(
      (result) => {
        if (result.isConfirmed) {
          this.pedidoService.delete(pedido.id!).subscribe(
            response => {
              this.pedidos = this.pedidos.filter(ped => ped != pedido);
              AlertHelper.alertaGuardar('Borraste un pedido ome');
            }
          );
        }
      }
    );
  }
}

