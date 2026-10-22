import { PerderVida } from "./PerderVida.js";
export class PerdaClima extends PerderVida {
    constructor(componente) { super(); this.componente = componente; }
    calcular(mascote) {
        return this.componente.calcular(mascote) + (mascote.clima === "frio" ? 1 : 0);
    }
}
