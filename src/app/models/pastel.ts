import { TipoPastel } from "./tipo-pastel";
import { Pedido } from "./pedido";

export class Pastel {
    constructor(public id?:number, public nombre?:string,
        public tipo?:TipoPastel,public pesoMin?:number,
        public adicional?:string, public pedido?:Pedido)
    {
      this.id = id;
      this.nombre = nombre;
      this.tipo =tipo;
      this.pesoMin = pesoMin;
      this.adicional = adicional;
      this.pedido = pedido;
    }
}
