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
  horno: Horno;
  title: string;
  constructor(private hornoService:HornoService, private router:Router, private activate:ActivatedRoute) {
    this.horno = new Horno();
    this.title = 'Registrar horno';
  }

  ngOnInit(): void {
    this.cargarHorno();
  }

  create(another?:boolean):void{
    this.hornoService.create(this.horno).subscribe(
      response => {
        if (another) {
          this.router.navigate(['/hornos/new']);
          this.horno = new Horno();
        }
        else {
          this.router.navigate(['/']);
        }
        Swal.fire(
          {
            title: 'Nea eres una chimba ',
            text: 'Creaste un horno ome ome ome ',
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
    if(this.horno.marca==null || this.horno.vEstimadoActual==null){
      this.alertaCheck('¿Se te olvidó diligenciar algún campo, mijo?');
      return false;
    }else if(this.horno.marca.charAt(0).match(/[\s]/)
    || this.horno.marca.charAt(this.horno.marca.length-1).match(/[\s]/)){
      this.alertaCheck('¿Pusiste espacios antes de los valores, mijo?');
      return false;
    }
    return true;
  }
}

