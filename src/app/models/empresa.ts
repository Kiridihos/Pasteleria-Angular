export class Empresa {
    constructor(public id?:number, public nombre?:string,
        public dirrecion?:string)
    {
        this.id = id;
        this.nombre = nombre;
        this.dirrecion = dirrecion;
    }
}