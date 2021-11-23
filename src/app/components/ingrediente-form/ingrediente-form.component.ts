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
            text: 'Creaste un ingrediente ome',
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
    this.create();
    }
  }
