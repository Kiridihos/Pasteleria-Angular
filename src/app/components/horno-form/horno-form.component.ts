import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Horno } from 'src/app/models/horno';
import {HornoService } from 'src/app/services/horno.service';

@Component({
  selector: 'app-horno-form',
  templateUrl: './horno-form.component.html',
  styleUrls: ['./horno-form.component.css']
})
export class HornoFormComponent implements OnInit {
  horno:Horno;
  constructor(private hornoService:HornoService, private router:Router, private activate:ActivatedRoute) { 
    this.horno = new Horno();
  }
  
  ngOnInit(): void {
    this.cargarHorno();
  }

  create():void{
    this.hornoService.create(this.horno).subscribe(
      response => {
        this.router.navigate(['/']);
        Swal.fire(
          {
            title: 'Nea eres una chimba ',
            text: 'Creaste un horno ome',
            icon: 'success',
            confirmButtonText: 'Melo'
          }
        );
      }
    );
  }

  cargarHorno():void{
    this.activate.params.subscribe(
      params => {
        let id = params['id'];
        if (id) {
          this.hornoService.getHorno(id).subscribe(
            horno => this.horno = horno
          );
        }
      }
    );
  }

  check():void{
    this.create();
    }
  }


