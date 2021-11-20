export class Pastel {
    constructor(public id?:number, public nombre?:String,
        public tipo?:String,public pesoMin?:number,
        public adicional?:String)
    {
        this.id = id;
        this.nombre = nombre;
        this.tipo =tipo;
        this.pesoMin = pesoMin;
        this.adicional = adicional;
    }
}
