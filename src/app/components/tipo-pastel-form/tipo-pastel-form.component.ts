import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoPastel } from 'src/app/models/tipo-pastel';
import { TipoPastelService } from 'src/app/services/tipo-pastel.service';
import { AlertHelper } from '../alert-helper';
import { ValidationHelper } from '../validation-helper';

@Component({
  selector: 'app-tipo-pastel-form',
  templateUrl: './tipo-pastel-form.component.html',
  styleUrls: ['./tipo-pastel-form.component.css']
})
export class TipoPastelFormComponent implements OnInit {
  title: string;
  tipoPastel:TipoPastel;
  constructor(private tipoPastelService:TipoPastelService, private router:Router, private activate:ActivatedRoute) {
    this.tipoPastel = new TipoPastel();
    this.title = '';
  }

  ngOnInit(): void {
    this.cargarTipoPastel();
  }

  create(another?:boolean):void{
    this.tipoPastelService.create(this.tipoPastel).subscribe(
      response => {
        if (another) {
          this.router.navigate(['/tipos_pastel/new']);
          this.tipoPastel = new TipoPastel();
        }
        else {
          this.router.navigate(['/']);
        }
        AlertHelper.alertaGuardar('Creaste un tipo de pastel ome');
      }
    );
  }

  cargarTipoPastel():void{
    this.activate.params.subscribe(
      params => {
        let id = params['id'];
        if (id) {
          this.tipoPastelService.getTipo(id).subscribe(
            tipoPastel => this.tipoPastel = tipoPastel
          );
          this.title = 'Editar tipo de pastel';
        }
        else {
          this.title = 'Registrar tipo de pastel';
        }
      }
    );
  }

  check(another?: boolean): void{
    if (this.valid()) {
      this.create(another);
    }
  }

  valid(): boolean{
    if (ValidationHelper.empty(this.tipoPastel)) {
      AlertHelper.alertaCheck('¿Se te olvidó diligenciar algún campo, mijo?');
      return false;
    }
    else if (ValidationHelper.spaces(this.tipoPastel.descripcion)) {
      AlertHelper.alertaCheck('¿Pusiste espacios antes o después de los valores, mijo?');
      return false;
    }
    else if (ValidationHelper.numbers(this.tipoPastel.descripcion)) {
      AlertHelper.alertaCheck('¿Pusiste un número en la descripción, mijo?');
      return false;
    }
    return true;
  }

}
