export class PersonaExterna {
    constructor(public id?:String, public cedula?:number,
        public nombres?:String,public apellidos?:String,
        public dir?:String,public fechaNac?:Date)
    {
        this.id = id;
        this.cedula = cedula;
        this.nombres =nombres;
        this.apellidos = apellidos;
        this.dir = dir;
        this.fechaNac = fechaNac;
    }
}
