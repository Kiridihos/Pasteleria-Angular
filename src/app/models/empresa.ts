import { Persona } from "./persona";

export class Empresa {
    constructor(public id?:string, public nit?:number, public nombre?:string,
        public direccion?:string, public persona?:Persona)
    {
      this.id = id;
      this.nit = nit;
      this.nombre = nombre;
      this.direccion = direccion;
      this.persona = persona;
    }
}
