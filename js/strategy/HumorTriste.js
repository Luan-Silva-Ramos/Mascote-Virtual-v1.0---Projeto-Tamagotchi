import { HumorStrategy } from "./HumorStrategy.js";

export class HumorTriste extends HumorStrategy {

    determinarEstado(mascote) {
        return "triste";
    }
}