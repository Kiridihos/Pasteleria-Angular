import { Persona } from "./persona";

export class Empresa {
    constructor(public nit?:number, public nombre?:string,
        public direccion?:string, public persona?:Persona)
    {
        this.nit = nit;
        this.nombre = nombre;
        this.direccion = direccion;
    }
}