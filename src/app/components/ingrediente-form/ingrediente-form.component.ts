import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingrediente } from 'src/app/models/ingrediente';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { AlertHelper } from '../alert-helper';
import { ValidationHelper } from '../validation-helper';

@Component({
  selector: 'app-ingrediente-form',
  templateUrl: './ingrediente-form.component.html',
  styleUrls: ['./ingrediente-form.component.css']
})
export class IngredienteFormComponent implements OnInit {
  ingrediente: Ingrediente;
  title: string;
  constructor(private ingredienteService:IngredienteService, private router:Router, private activate:ActivatedRoute) {
    this.ingrediente = new Ingrediente();
    this.title = 'Registrar ingrediente';
  }

  ngOnInit(): void {
    this.cargarIngrediente();
  }

  create(another?:boolean):void{
    this.ingredienteService.create(this.ingrediente).subscribe(
      response => {
        if (another) {
          this.router.navigate(['/ingredientes/new']);
          this.ingrediente = new Ingrediente();
        }
        else {
          this.router.navigate(['/']);
        }
        AlertHelper.alertaGuardar('Creaste un ingrediente ome');
      }
    );
  }

  cargarIngrediente():void{
    this.activate.params.subscribe(
      params => {
        let id = params['id'];
        if (id) {
          this.ingredienteService.getIngrediente(id).subscribe(
            ingrediente => this.ingrediente = ingrediente
          );
        }
      }
    );
  }

  check(another?:boolean):void{
    if(this.isCheckInputs()){
      this.create(another);
    }
  }
  isCheckInputs():boolean{
    if (ValidationHelper.empty(this.ingrediente)) {
      AlertHelper.alertaCheck('¿Se te olvidó diligenciar algún campo, mijo?');
      return false;
    }
    else if (ValidationHelper.spaces(this.ingrediente.nombre)) {
      AlertHelper.alertaCheck('¿Pusiste espacios antes o después de los valores, mijo?');
      return false;
    }
    return true;
  }
}
