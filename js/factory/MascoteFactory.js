import { Mascote } from "../model/Mascote.js";

export class MascoteFactory {
    static criar(tipo, nome) {
        switch (tipo) {
            case "lobo":
                return new Mascote(nome);

            default:
                throw new Error("Tipo de mascote não encontrado.");
        }
    }
}
