// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// Otros
// Locales
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { EmpleadosListComponent } from './components/empleados-list/empleados-list.component';
import { EmpleadosFormComponent } from './components/empleados-form/empleados-form.component';
import { ClientesFormComponent } from './components/clientes-form/clientes-form.component';
import { TipoEmpleadoFormComponent } from './components/tipo-empleado-form/tipo-empleado-form.component';
import { TipoEmpleadoListComponent } from './components/tipo-empleado-list/tipo-empleado-list.component';

const router:Routes = [
  {path: '', component:CarruselComponent },
  {path: 'empleados', component:EmpleadosListComponent},
  {path: 'empleados/new', component:EmpleadosFormComponent},
  {path: 'clientes/new', component:ClientesFormComponent},
  {path: 'tipos_empleado', component: TipoEmpleadoListComponent},
  {path: 'tipos_empleado/new', component: TipoEmpleadoFormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarruselComponent,
    MainComponent,
    EmpleadosListComponent,
    EmpleadosFormComponent,
    ClientesFormComponent,
    TipoEmpleadoFormComponent,
    TipoEmpleadoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(router)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }