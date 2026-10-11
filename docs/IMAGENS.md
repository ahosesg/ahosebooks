# Elementos visuais da edição 1.0

## Fotografia da capa

- Autor: K.
- Origem: https://www.pexels.com/photo/drone-shot-of-a-container-ship-in-the-port-17311127/
- Licença: https://www.pexels.com/license/
- Arquivo aprovado: `public/images/porto-k-17311127.jpg`.
- SHA-256: `dfd864f37ea4d3731694193ed83178c373e5549a57b4bc63047d1b0ee3df0bd5`.

A foto é ilustrativa, sem representar empresa dos casos. Mantidos recorte, máscara e composição da capa validada. O crédito aparece na capa e na última página. A conferência da licença foi feita em 11/10/2026. `npm run assets` reutiliza o arquivo aprovado e verifica o hash.

## Figuras e gráficos

As fotografias internas foram retiradas. Figuras em HTML/CSS/SVG são de elaboração AHOS ESG, com fontes junto aos elementos: setores do Anexo I, estrutura SH/NCM/CN, papéis da cadeia, participação do precursor e documentos previstos nas normas. Fluxos, árvore, linha do tempo e esquemas dos casos completam os recursos visuais.

O gráfico vetorial em `public/figures/minimis.svg` contém dois painéis: cenários alternativos de massa anual (40, 50, 55 e 51 t) e um exemplo cumulativo (10, 50 e 55 t). Todos os números são hipotéticos, relativos a mercadorias elegíveis; a referência legal é 50 t. Os dados estão em `src/data/chart-examples.json` e o script de reprodução é `scripts/create-figures.py`.

Não há proporção quantitativa nas figuras conceituais de precursores e papéis. Elas não reproduzem imagens oficiais nem ensinam o preenchimento de um formulário.
