// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
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
import { HornosListComponent } from './components/hornos-list/hornos-list.component';
import { HornoFormComponent } from './components/horno-form/horno-form.component';
import { IngredienteFormComponent } from './components/ingrediente-form/ingrediente-form.component';
import { IngredienteListComponent } from './components/ingrediente-list/ingrediente-list.component';
import { TipoEmpleadoListComponent } from './components/tipo-empleado-list/tipo-empleado-list.component';
import { ClientesListComponent } from './components/clientes-list/clientes-list.component';
import { PedidoListComponent } from './components/pedido-list/pedido-list.component';
import { PedidoFormComponent } from './components/pedido-form/pedido-form.component';
import { TipoPastelFormComponent } from './components/tipo-pastel-form/tipo-pastel-form.component';
import { TipoPastelListComponent } from './components/tipo-pastel-list/tipo-pastel-list.component';


const router:Routes = [
  {path: '', component:CarruselComponent },
  {path: 'empleados', component:EmpleadosListComponent},
  {path: 'empleados/new', component:EmpleadosFormComponent},
  {path: 'empleados/update/:id', component:EmpleadosFormComponent},
  {path: 'clientes/new', component:ClientesFormComponent},
  {path: 'clientes/update/:nit', component:ClientesFormComponent},
  {path: 'clientes/update/:id', component:ClientesFormComponent},
  {path: 'clientes', component: ClientesListComponent},
  {path: 'hornos', component: HornosListComponent},
  {path: 'hornos/new', component: HornoFormComponent},
  {path: 'hornos/update/:id', component: HornoFormComponent},
  {path: 'ingredientes', component: IngredienteListComponent},
  {path: 'ingredientes/new', component: IngredienteFormComponent},
  {path: 'ingredientes/update/:id', component: IngredienteFormComponent},
  {path: 'tipos_empleado', component: TipoEmpleadoListComponent},
  {path: 'tipos_empleado/new', component: TipoEmpleadoFormComponent},
  {path: 'pedidos/new', component: PedidoFormComponent},
  {path: 'pedidos', component: PedidoListComponent},
  {path: 'tipos_pastel', component: TipoPastelListComponent},
  {path: 'tipos_pastel/new', component: TipoPastelFormComponent},
  {path: 'tipos_pastel/update/:id', component: TipoPastelFormComponent},
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
    HornosListComponent,
    HornoFormComponent,
    IngredienteFormComponent,
    IngredienteListComponent,
    TipoEmpleadoListComponent,
    ClientesListComponent,
    PedidoListComponent,
    PedidoFormComponent,
    TipoPastelFormComponent,
    TipoPastelListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(router),
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
