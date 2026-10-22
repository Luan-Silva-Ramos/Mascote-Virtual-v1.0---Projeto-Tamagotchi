import { HumorStrategy } from "./HumorStrategy.js";

export class HumorNormal extends HumorStrategy {

    determinarEstado(mascote) {
        return "normal";
    }
}