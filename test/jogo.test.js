import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MascoteFactory } from '../js/factory/MascoteFactory.js';
import { PerdaNormal } from '../js/decorator/PerdaNormal.js';
import { PerdaDoenca } from '../js/decorator/PerdaDoenca.js';
import { PerdaClima } from '../js/decorator/PerdaClima.js';
import { Jogo } from '../js/core/Jogo.js';

test('factory, limites e ações', () => {
 const m = MascoteFactory.criar('lobo','Lobo');
 assert.equal(m.estado,'feliz');
 assert.throws(() => MascoteFactory.criar('gato','Gato'));
 m.alimentar(); m.curar(); assert.equal(m.fome,100); assert.equal(m.vida,100);
 m.brincar(); assert.equal(m.energia,85); assert.equal(m.fome,90);
 m.dormir(); assert.equal(m.energia,100); assert.equal(m.fome,82);
 for(let i=0;i<20;i++) m.brincar();
 assert.equal(m.energia,0); assert.equal(m.fome,0); assert.equal(m.felicidade,100);
});
test('estratégias e prioridade de estados', () => {
 const m = MascoteFactory.criar('lobo','Lobo');
 for(const [fome,energia,felicidade,estado] of [[100,100,60,'normal'],[100,100,90,'feliz'],[100,100,20,'triste'],[100,20,90,'cansado'],[20,20,20,'doente']]) {
 Object.assign(m,{fome,energia,felicidade}); m.verificarEstado(); assert.equal(m.estado,estado);
 }
});
test('decoradores combinam perdas e clima', () => {
 const perda = new PerdaClima(new PerdaDoenca(new PerdaNormal()));
 assert.equal(perda.calcular({fome:100,energia:100,felicidade:100,clima:'normal'}),0);
 assert.equal(perda.calcular({fome:0,energia:0,felicidade:0,clima:'frio'}),13);
});
test('tempo causa morte; ações não ressuscitam', () => {
 const m = MascoteFactory.criar('lobo','Lobo');
 m.passarTempo(); assert.equal(m.fome,98); assert.equal(m.energia,99); assert.equal(m.vida,100);
 for(let i=0;i<200;i++) m.passarTempo();
 assert.equal(m.vida,0); assert.equal(m.gameOver,true); assert.equal(m.estado,'game-over');
 const anterior=JSON.stringify(m); m.alimentar(); m.brincar(); m.dormir(); m.curar(); m.passarTempo();
 assert.equal(JSON.stringify(m),anterior);
});
test('interface, botões, intervalo e reinício', () => {
 const nodes = new Map();
 const node = id => {
 if(!nodes.has(id)) {
 const classes = new Set(['hidden']);
 nodes.set(id,{textContent:'',style:{},disabled:false,listeners:{},classList:{toggle(c,force){if(force)classes.add(c);else classes.delete(c);},contains(c){return classes.has(c);}},addEventListener(type,fn){this.listeners[type]=fn;}});
 } return nodes.get(id);
 };
 const oldDocument=globalThis.document, oldSet=globalThis.setInterval, oldClear=globalThis.clearInterval;
 const timers=new Map(); let next=0;
 globalThis.document={querySelector:node,querySelectorAll:()=>['#alimentar','#brincar','#dormir','#curar'].map(node)};
 globalThis.setInterval=fn=>{timers.set(++next,fn);return next;};
 globalThis.clearInterval=id=>timers.delete(id);
 try {
 const jogo=new Jogo(); jogo.iniciar(); assert.equal(timers.size,1); assert.equal(node('#estado').textContent,'Feliz');
 jogo.tempo.iniciar(); assert.equal(timers.size,1);
 node('#brincar').listeners.click(); assert.equal(jogo.mascote.energia,85); assert.equal(node('#energiaBar').style.width,'85%');
 jogo.mascote.vida=1; jogo.mascote.fome=0; jogo.atualizar();
 assert.equal(timers.size,0); assert.equal(node('#gameOver').classList.contains('hidden'),false); assert.equal(node('#alimentar').disabled,true);
 node('#curar').listeners.click(); assert.equal(jogo.mascote.vida,0);
 node('#reiniciar').listeners.click(); assert.equal(jogo.mascote.vida,100); assert.equal(timers.size,1); assert.equal(node('#gameOver').classList.contains('hidden'),true); assert.equal(node('#alimentar').disabled,false);
 jogo.tempo.parar();
 } finally { globalThis.document=oldDocument;globalThis.setInterval=oldSet;globalThis.clearInterval=oldClear; }
});
