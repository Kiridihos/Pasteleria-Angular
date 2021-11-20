import { Horno} from "./horno";
export class EtapaPastel {
    constructor(public id?:number, public tempCoccion?:number,
        public fechaInicio?:Date,public fechaFin?:Date,
        public hornoAsignado?:Horno)
    {
        this.id = id;
        this.tempCoccion = tempCoccion;
        this.fechaInicio =fechaInicio;
        this.fechaFin = fechaFin;
        this.hornoAsignado = hornoAsignado;
    }
}
