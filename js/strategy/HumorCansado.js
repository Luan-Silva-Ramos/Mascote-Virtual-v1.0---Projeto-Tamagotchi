import { HumorStrategy } from "./HumorStrategy.js";

export class HumorCansado extends HumorStrategy {

    determinarEstado(mascote) {
        return "cansado";
    }
}