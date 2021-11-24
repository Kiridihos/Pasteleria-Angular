import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Horno } from 'src/app/models/horno';
import { HornoService } from 'src/app/services/horno.service';
import { AlertHelper } from '../alert-helper';

@Component({
  selector: 'app-hornos-list',
  templateUrl: './hornos-list.component.html',
  styleUrls: ['./hornos-list.component.css']
})
export class HornosListComponent implements OnInit {
  hornos:Horno[];
  constructor(private hornoService:HornoService, private router:Router, private activate:ActivatedRoute) {
    this.hornos = [];
  }



  ngOnInit(): void {
    this.hornoService.getHornos().subscribe(
      hornos => {
        this.hornos = hornos
      }
    );
  }

  delete(horno:Horno):void{
    AlertHelper.alertaBorrar().then(
      (result) => {
        if (result.isConfirmed) {
          this.hornoService.delete(horno.id!).subscribe(
            response => {
              this.hornos = this.hornos.filter(hor => hor != horno);
              AlertHelper.alertaGuardar('Borraste un horno ome');
            }
          );
        }
      }
    );
  }
}
