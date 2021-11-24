import { Component, OnInit } from '@angular/core';
import { TipoPastelService } from 'src/app/services/tipo-pastel.service';
import Swal from 'sweetalert2';
import { TipoPastel } from 'src/app/models/tipo-pastel';


@Component({
  selector: 'app-tipo-pastel-list',
  templateUrl: './tipo-pastel-list.component.html',
  styleUrls: ['./tipo-pastel-list.component.css']
})
export class TipoPastelListComponent implements OnInit {
  tipos: TipoPastel[];
  title: string;

  constructor(private tipoService: TipoPastelService) {
    this.tipos = [];
    this.title = 'Lista de tipos de pastel';
  }

  ngOnInit(): void {
    this.tipoService.getTipos().subscribe(
      tipos => this.tipos = tipos
    );
  }

  delete(tipo: TipoPastel): void{
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
          this.tipoService.delete(tipo.id!).subscribe(
            response => {
              this.tipos = this.tipos.filter(t => t != tipo);
              Swal.fire(
                {
                  title: 'Eres una chimba',
                  text: 'Borraste un empleado ome',
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
