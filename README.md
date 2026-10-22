# Mascote Virtual — V1

## Executar
Abra a pasta no VS Code e use **Live Server** no `index.html`.
Ou, com Python instalado, execute nesta pasta:

```sh
python -m http.server 8000
```

Acesse http://localhost:8000. Use um servidor local: abrir o HTML por duplo clique pode bloquear os módulos JavaScript.

## Correções
- Import relativo de Jogo e nome do arquivo MascoteFactory corrigidos.
- Imports de HumorStrategy adicionados; estratégias usadas pelo modelo.
- CSS implementado, incluindo barras, expressões, layout responsivo e ocultação do Game Over.
- Decorator implementado e integrado à perda de vida.
- Tempo protegido contra intervalos duplicados; reinício recria o mascote sem recarregar a página.
- Ações bloqueadas após Game Over e estado inicial atualizado.
- Rótulo “Saciedade” para esclarecer que 100 significa alimentado.

## Regras
A cada 3 segundos: saciedade -2, energia -1, felicidade -1.
Com saciedade <=20, perde 2 de vida por ciclo. Em zero, saciedade acrescenta 5, energia 3 e felicidade 2 à perda.
O decorador de clima acrescenta 1 se `mascote.clima` for `"frio"`; o padrão é `"normal"`, sem eventos de clima automáticos.
As ações mantêm os valores entre 0 e 100. Vida zero encerra a partida.

## Verificação
Com Node.js instalado, execute `npm test`. Os testes cobrem imports, ações, estados, decoradores, morte, interface e reinício.
As pastas de assets do ZIP original estavam vazias; o mascote é desenhado em CSS.
