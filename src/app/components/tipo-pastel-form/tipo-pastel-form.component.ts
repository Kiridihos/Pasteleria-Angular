import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoPastel } from 'src/app/models/tipo-pastel';
import { TipoPastelService } from 'src/app/services/tipo-pastel.service';

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
    this.title = 'Registrar tipos de pastel'
  }

  ngOnInit(): void {
    this.cargarTipoPastel();
  }

  create():void{
    this.tipoPastelService.create(this.tipoPastel).subscribe(
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
          this.tipoPastelService.getTipo(id).subscribe(
            tipoPastel => this.tipoPastel = tipoPastel
          );
        }
      }
    );
  }

  check():void{
   this.create();
  }

}
