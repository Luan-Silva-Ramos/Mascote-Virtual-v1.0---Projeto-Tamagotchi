import { PerderVida } from "./PerderVida.js";
export class PerdaDoenca extends PerderVida {
    constructor(componente) { super(); this.componente = componente; }
    calcular(mascote) {
        return this.componente.calcular(mascote) + (mascote.fome <= 20 ? 2 : 0);
    }
}
