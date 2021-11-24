import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoPastel } from 'src/app/models/tipo-pastel';
import {TipoPastelService } from 'src/app/services/tipo-pastel.service';
import { Pastel } from 'src/app/models/pastel';
import { PastelService } from 'src/app/services/pastel.service';

@Component({
  selector: 'app-tipo-pastel-form',
  templateUrl: './tipo-pastel-form.component.html',
  styleUrls: ['./tipo-pastel-form.component.css']
})
export class TipoPastelFormComponent implements OnInit {
  pastel: Pastel;
  title: string;
  tipoPastel:TipoPastel[];
  constructor(private pastelService: PastelService, tipoPastelService:TipoPastelService, private router:Router, private activate:ActivatedRoute) {
    this.pastel = new TipoPastel();
    this.tipoPastel = [];
    this.title = 'Registrar el tipo de pastel'
  }

  ngOnInit(): void {
    this.cargarTipoPastel();
    this.getTipos();
  }

  getTipos():void{
    this.tipoPastelService.getPasteles().subscribe(
      tipoPastel => this.tipoPastel = tipoPastel
    );
  }

  create():void{
    this.pastelService.create(this.pastel).subscribe(
      response => {
        this.router.navigate(['/']);
        Swal.fire(
          {
            title: 'Nea eres una chimba ',
            text: 'Creaste un tipo de pastel ome ',
            icon: 'success',
            confirmButtonText: 'Melo'
          }
        );
      }
    );
  }

  cargarTipoPastel():void{
    this.activate.params.subscribe(
      params => {
        let id = params['id'];
        if (id) {
          this.pastelService.getPastel(id).subscribe(
            pastel => this.pastel = pastel
          );
        }
      }
    );
  }

  check():void{
   this.create();
  }

}
