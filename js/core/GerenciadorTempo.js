export class GerenciadorTempo {
    constructor(jogo) {
        this.jogo = jogo;
        this.intervalo = null;
    }

    iniciar() {
        this.parar();
        this.intervalo = setInterval(() => {
            this.jogo.atualizar();
        }, 3000);
    }

    parar() {
        clearInterval(this.intervalo);
        this.intervalo = null;
    }
}
