import { TipoEmpleado } from "./tipo-empleado";
import { Persona } from "./persona";
export class Empleado {
    constructor(public id?:string, public nombres?:string,
        public apellidos?:string, public salarioActual?:number,
        public tipoEmpleado?:TipoEmpleado, public persona?:Persona)
    {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.salarioActual = salarioActual;
        this.tipoEmpleado = tipoEmpleado;
        this.persona = persona;
    }
}
