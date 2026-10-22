import { MascoteFactory } from "../factory/MascoteFactory.js";
import { GerenciadorTempo } from "./GerenciadorTempo.js";

export class Jogo {
    constructor() {
        this.mascote = MascoteFactory.criar("lobo", "Lobo");
        this.tempo = new GerenciadorTempo(this);

        this.elementos = {
            mascote: document.querySelector("#mascote"),
            estado: document.querySelector("#estado"),
            vidaTexto: document.querySelector("#vidaTexto"),
            fomeTexto: document.querySelector("#fomeTexto"),
            energiaTexto: document.querySelector("#energiaTexto"),
            felicidadeTexto: document.querySelector("#felicidadeTexto"),
            vidaBar: document.querySelector("#vidaBar"),
            fomeBar: document.querySelector("#fomeBar"),
            energiaBar: document.querySelector("#energiaBar"),
            felicidadeBar: document.querySelector("#felicidadeBar"),
            mensagem: document.querySelector("#mensagem"),
            gameOver: document.querySelector("#gameOver")
        };
    }

    iniciar() {
        this.configurarBotoes();
        this.atualizarTela();
        this.tempo.iniciar();
    }

    configurarBotoes() {
        document.querySelector("#alimentar")
            .addEventListener("click", () => {
                if (this.mascote.gameOver) return;
                this.mascote.alimentar();
                this.mascote.verificarEstado();
                this.atualizarTela();
                this.mensagem("Mascote alimentado.");
            });

        document.querySelector("#brincar")
            .addEventListener("click", () => {
                if (this.mascote.gameOver) return;
                this.mascote.brincar();
                this.mascote.verificarEstado();
                this.atualizarTela();
                this.mensagem("Mascote brincou.");
            });

        document.querySelector("#dormir")
            .addEventListener("click", () => {
                if (this.mascote.gameOver) return;
                this.mascote.dormir();
                this.mascote.verificarEstado();
                this.atualizarTela();
                this.mensagem("Mascote dormiu.");
            });

        document.querySelector("#curar")
            .addEventListener("click", () => {
                if (this.mascote.gameOver) return;
                this.mascote.curar();
                this.mascote.verificarEstado();
                this.atualizarTela();
                this.mensagem("Mascote foi curado.");
            });

        document.querySelector("#reiniciar")
            .addEventListener("click", () => {
                this.tempo.parar();
                this.mascote = MascoteFactory.criar("lobo", "Lobo");
                this.atualizarTela();
                this.mensagem("Cuide do seu mascote!");
                this.tempo.iniciar();
            });
    }

    atualizar() {
        this.mascote.passarTempo();
        this.atualizarTela();

        if (this.mascote.gameOver) {
            this.tempo.parar();
        }
    }

    atualizarTela() {
        const m = this.mascote;

        this.elementos.vidaTexto.textContent = m.vida;
        this.elementos.fomeTexto.textContent = m.fome;
        this.elementos.energiaTexto.textContent = m.energia;
        this.elementos.felicidadeTexto.textContent = m.felicidade;

        this.elementos.vidaBar.style.width = `${m.vida}%`;
        this.elementos.fomeBar.style.width = `${m.fome}%`;
        this.elementos.energiaBar.style.width = `${m.energia}%`;
        this.elementos.felicidadeBar.style.width = `${m.felicidade}%`;

        this.elementos.mascote.className = `mascot ${m.estado}`;

        const nomes = {
            normal: "Normal",
            feliz: "Feliz",
            triste: "Triste",
            cansado: "Cansado",
            doente: "Doente",
            "game-over": "Game Over"
        };

        this.elementos.estado.textContent = nomes[m.estado];

        this.elementos.gameOver.classList.toggle("hidden", !m.gameOver);
        document.querySelectorAll(".actions button").forEach(botao => {
            botao.disabled = m.gameOver;
        });
        if (m.gameOver) this.mensagem("Seu mascote não conseguiu sobreviver.");
    }

    mensagem(texto) {
        this.elementos.mensagem.textContent = texto;
    }
}
