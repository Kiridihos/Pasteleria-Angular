import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Ingrediente } from 'src/app/models/ingrediente';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { AlertHelper } from '../alert-helper';

@Component({
  selector: 'app-ingrediente-list',
  templateUrl: './ingrediente-list.component.html',
  styleUrls: ['./ingrediente-list.component.css']
})
export class IngredienteListComponent implements OnInit {
  ingredientes:Ingrediente[];
  constructor(private ingredienteService:IngredienteService, private router:Router, private activate:ActivatedRoute) {
    this.ingredientes = [];
  }



  ngOnInit(): void {
    this.ingredienteService.getIngredientes().subscribe(
      ingredientes => {
        this.ingredientes = ingredientes
      }
    );
  }

  delete(ingrediente:Ingrediente):void{
    AlertHelper.alertaBorrar().then(
      (result) => {
        if (result.isConfirmed) {
          this.ingredienteService.delete(ingrediente.id!).subscribe(
            response => {
              this.ingredientes = this.ingredientes.filter(ing => ing != ingrediente);
              AlertHelper.alertaGuardar('Borraste un ingrediente ome');
            }
          );
        }
      }
    );
  }
}
