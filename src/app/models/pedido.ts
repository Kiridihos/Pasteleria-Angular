import { Empleado } from "./empleado";
export class Pedido {
    constructor(public id?:number, public fechaSolicitud?:Date,
        public fechaEntrega?:Date,public empleado?:Empleado)
    {
        this.id = id;
        this.fechaSolicitud = fechaSolicitud;
        this.fechaEntrega =fechaEntrega;
        this.empleado = empleado;
    }
}
