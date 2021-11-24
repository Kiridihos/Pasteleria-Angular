import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pastel } from 'src/app/models/pastel';
import { PastelService } from 'src/app/services/pastel.service';
import { AlertHelper } from '../alert-helper';

@Component({
  selector: 'app-pastel-list',
  templateUrl: './pastel-list.component.html',
  styleUrls: ['./pastel-list.component.css']
})
export class PastelListComponent implements OnInit {
  pasteles: Pastel[];
  title: string;
  constructor(private pastelService:PastelService, private router:Router, private activate:ActivatedRoute) {
    this.pasteles = [];
    this.title = 'Lista de pasteles';
  }

  ngOnInit(): void {
    this.pastelService.getPasteles().subscribe(
      pasteles => {
        this.pasteles = pasteles
      }
    );
  }

  delete(pastel:Pastel):void{
    AlertHelper.alertaBorrar().then(
      (result) => {
        if (result.isConfirmed) {
          this.pastelService.delete(pastel.id!).subscribe(
            response => {
              this.pasteles = this.pasteles.filter(emp => emp != pastel);
              AlertHelper.alertaGuardar('Borraste un pastel ome');
            }
          );
        }
      }
    );
  }

}
