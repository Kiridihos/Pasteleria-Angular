import { Persona } from "./persona";
export class PersonaExterna {
    constructor(public id?:string, public cedula?:number,
        public nombres?:string,public apellidos?:string,
        public dir?:string,public fechaNac?:string,
        public persona?:Persona)
    {
        this.id = id;
        this.cedula = cedula;
        this.nombres =nombres;
        this.apellidos = apellidos;
        this.dir = dir;
        this.fechaNac = fechaNac;
        this.persona = persona;
    }
}
