import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Pastel } from 'src/app/models/pastel';
import { PastelService } from 'src/app/services/pastel.service';

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
    Swal.fire(
      {
        title: 'Estás seguro, parce?',
        text: 'Esto no tiene vuelta atrás',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Uy zonas',
        confirmButtonText: 'Sisas'
      }
    ).then(
      (result) => {
        if (result.isConfirmed) {
          this.pastelService.delete(pastel.id!).subscribe(
            response => {
              this.pasteles = this.pasteles.filter(emp => emp != pastel);
              Swal.fire(
                {
                  title: 'Eres una chimba',
                  text: 'Borraste un pastel ome',
                  icon: 'success',
                  confirmButtonText: 'Melo'
                }
              );
            }
          );
        }
      }
    );
  }

}
