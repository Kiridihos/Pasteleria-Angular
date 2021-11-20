export class Horno {
    constructor(public id?:number, public marca?:String,
        public vEstimadoActual?:number)
    {
        this.id = id;
        this.marca = marca;
        this.vEstimadoActual =vEstimadoActual;
    }
}
