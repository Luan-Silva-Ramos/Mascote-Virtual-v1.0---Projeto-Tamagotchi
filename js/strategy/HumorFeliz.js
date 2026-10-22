import { HumorStrategy } from "./HumorStrategy.js";

export class HumorFeliz extends HumorStrategy {

    determinarEstado(mascote) {
        return "feliz";
    }
}