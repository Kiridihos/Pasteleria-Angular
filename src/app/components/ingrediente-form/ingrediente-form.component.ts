import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Ingrediente } from 'src/app/models/ingrediente';
import {IngredienteService } from 'src/app/services/ingrediente.service';

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
        Swal.fire(
          {
            title: 'Nea eres una chimba ',
            text: 'Creaste un ingrediente de medallo ome',
            icon: 'success',
            confirmButtonText: 'Melo'
          }
        );
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

  alertaCheck(mensaje: string) {
    Swal.fire({
      title: 'Error en los campos del formulario',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Uy, zonas'
    });
  }
  check(another?:boolean):void{
    if(this.isCheckInputs()){
      this.create(another);
    }
  }
  isCheckInputs():boolean{
    var alphaExp = /^[a-zA-Za\s]+$/
    if(this.ingrediente.nombre==null || this.ingrediente.uMed==null){
      this.alertaCheck('¿Se te olvidó diligenciar algún campo, mijo?');
      return false;
    }else if(this.ingrediente.nombre.charAt(0).match(/[\s]/) || this.ingrediente.nombre.charAt( this.ingrediente.nombre.length-1).match(/[\s]/)){
      this.alertaCheck('¿Se te olvidó diligenciar algún campo, mijo?');
      return false;
    }
    return true;
  }
}
