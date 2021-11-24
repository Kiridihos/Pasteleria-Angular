import { Empleado } from "./empleado";
import { Persona } from "./persona";
export class Pedido {
    constructor(public id?:number, public fechaSolicitud?:Date,
      public fechaEntrega?: string, public empleado?: Empleado,
      public cliente?:Persona)
    {
      this.id = id;
      this.fechaSolicitud = fechaSolicitud;
      this.fechaEntrega =fechaEntrega;
      this.empleado = empleado;
      this.cliente = cliente;
    }
}
