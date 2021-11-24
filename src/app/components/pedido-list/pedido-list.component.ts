import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';

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
          this.pedidoService.delete(pedido.id!).subscribe(
            response => {
              this.pedidos = this.pedidos.filter(ped => ped != pedido);
              Swal.fire(
                {
                  title: 'Eres una chimba',
                  text: 'Borraste un pedido ome',
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

