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
  ingrediente:Ingrediente;
  constructor(private ingredienteService:IngredienteService, private router:Router, private activate:ActivatedRoute) { 
    this.ingrediente = new Ingrediente();
  }
  
  ngOnInit(): void {
    this.cargarIngrediente();
  }

  create():void{
    this.ingredienteService.create(this.ingrediente).subscribe(
      response => {
        this.router.navigate(['/']);
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
  check():void{
    if(this.isCheckInputs()){
      this.create();
    }
  }
  isCheckInputs():boolean{
    var alphaExp = /^[a-zA-Za\s]+$/
    if(this.ingrediente.nombre==null || this.ingrediente.uMed==null){
      Swal.fire(
        {
          title: 'CAMPOS VACIOS',
          text: 'no pueden haber campos vacios',
          icon: 'error',
          confirmButtonText: 'Volver'
        }
      );
      return false;
    }else if(this.ingrediente.nombre.charAt(0).match(/[\s]/) || this.ingrediente.nombre.charAt( this.ingrediente.nombre.length-1).match(/[\s]/)){
      Swal.fire(
        {
          title: 'CAMPOS CON ESPACIOS',
          text: 'los campos no pueden empezar/terminar con espacios',
          icon: 'error',
          confirmButtonText: 'Volver'
        }
      );
      return false;
    }else if(! this.ingrediente.nombre.match(alphaExp)){
      Swal.fire(
        {
          title: 'VALORES INVALIDOS',
          text: 'nombres/apellidos solo pueden tener letras',
          icon: 'error',
          confirmButtonText: 'Volver'
        }
      );
      return false;
    }
    return true;
  }
}
