import { PerderVida } from "./PerderVida.js";
export class PerdaNormal extends PerderVida {
    calcular(mascote) {
        return (mascote.fome === 0 ? 5 : 0)
            + (mascote.energia === 0 ? 3 : 0)
            + (mascote.felicidade === 0 ? 2 : 0);
    }
}
