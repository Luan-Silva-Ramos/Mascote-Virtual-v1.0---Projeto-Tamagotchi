import { HumorNormal } from "../strategy/HumorNormal.js";
import { HumorFeliz } from "../strategy/HumorFeliz.js";
import { HumorTriste } from "../strategy/HumorTriste.js";
import { HumorCansado } from "../strategy/HumorCansado.js";
import { PerdaNormal } from "../decorator/PerdaNormal.js";
import { PerdaDoenca } from "../decorator/PerdaDoenca.js";
import { PerdaClima } from "../decorator/PerdaClima.js";

export class Mascote {
    constructor(nome) {
        this.nome = nome;

        this.vida = 100;
        this.fome = 100;
        this.energia = 100;
        this.felicidade = 100;

        this.clima = "normal";
        this.perdaVida = new PerdaClima(new PerdaDoenca(new PerdaNormal()));
        this.humor = new HumorNormal();
        this.estado = "normal";
        this.gameOver = false;
        this.verificarEstado();
    }

    alimentar() {
        if (this.gameOver) return;

        this.fome = Math.min(100, this.fome + 25);
        this.energia = Math.min(100, this.energia + 5);
    }

    brincar() {
        if (this.gameOver) return;

        this.felicidade = Math.min(100, this.felicidade + 25);
        this.fome = Math.max(0, this.fome - 10);
        this.energia = Math.max(0, this.energia - 15);
    }

    dormir() {
        if (this.gameOver) return;

        this.energia = Math.min(100, this.energia + 35);
        this.fome = Math.max(0, this.fome - 8);
    }

    curar() {
        if (this.gameOver) return;

        this.vida = Math.min(100, this.vida + 20);
        this.felicidade = Math.min(100, this.felicidade + 5);
    }

    passarTempo() {
        if (this.gameOver) return;

        this.fome = Math.max(0, this.fome - 2);
        this.energia = Math.max(0, this.energia - 1);
        this.felicidade = Math.max(0, this.felicidade - 1);

        this.vida = Math.max(0, this.vida - this.perdaVida.calcular(this));
        this.verificarEstado();
    }

    verificarEstado() {
        if (this.vida <= 0) {
            this.vida = 0;
            this.gameOver = true;
            this.estado = "game-over";
            return;
        }

        if (this.fome <= 20) {
            this.estado = "doente";
        } else if (this.energia <= 25) {
            this.humor = new HumorCansado();
            this.estado = this.humor.determinarEstado(this);
        } else if (this.felicidade <= 30) {
            this.humor = new HumorTriste();
            this.estado = this.humor.determinarEstado(this);
        } else if (this.felicidade >= 80) {
            this.humor = new HumorFeliz();
            this.estado = this.humor.determinarEstado(this);
        } else {
            this.humor = new HumorNormal();
            this.estado = this.humor.determinarEstado(this);
        }
    }
}
