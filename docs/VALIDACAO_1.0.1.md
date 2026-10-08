# Validação da edição 1.0.1

Data: 08/10/2026. Fonte verificada: commit `914e119128704a1d8ee0f8335f7a78d1c49f44da`.

[Execução do GitHub Actions concluída com sucesso](https://github.com/ahosesg/ahosebooks/actions/runs/37791784478).

A revisão alterna as paletas oficiais Light e Strong, confirmadas no documento-base AHOS ESG v3.0. O conteúdo técnico, a estrutura e a paginação foram preservados.

| Paleta | Páginas | Aplicação |
| --- | --- | --- |
| Strong | 3, 6, 8, 10 e 14 | Atualizações, rotas de exportação, precursores, de minimis e próximos passos |
| Light | 1, 2, 4, 5, 7, 9, 11, 12, 13 e 15 | Capa e demais seções, incluindo árvore de decisão, ficha e referências |

| Verificação | Resultado |
| --- | --- |
| Build Astro | Passou no ambiente local e no GitHub Actions |
| Instalação pelo lockfile | `npm ci` passou no GitHub Actions |
| Estrutura editorial | 15 páginas; 8 referências |
| Fontes da impressão | Inter 400/600 e Montserrat 600/700 carregadas |
| Temas da impressão | Strong nas cinco páginas previstas; Light nas demais |
| Área de impressão | Sem extravasamento de conteúdo ou colisão com rodapé nas 15 páginas |
| PDF | 15 páginas A4 verticais; texto selecionável e links preservados |
| Comparação de texto com 1.0.0 | Conteúdo técnico idêntico nas 15 páginas; apenas o número da edição na página 15 passou para 1.0.1 |
| Contraste | Todos os dez pares de texto e fundo avaliados atingem pelo menos 4,5:1; cálculo pela luminância relativa WCAG |
| Revisão visual | Todas as 15 páginas renderizadas e inspecionadas; sem cortes, sobreposições ou caracteres ausentes identificados |

Arquivo: `public/downloads/minha-empresa-esta-no-cbam.pdf`, 125.164 bytes.

SHA-256: `a860cf3f2d800196d058a18ad968698ed8721076c9d8f138dcee56cc9ca1c7b5`.

Os relatórios desta revisão estão em `docs/validacao/1.0.1/`. As evidências da edição 1.0.0 permanecem em seus caminhos anteriores. Os temas são configurados em `src/data/design.json` e usam o mesmo CSS na web e no PDF.

Esta revisão verifica a impressão, o PDF e os pares de contraste indicados. Não houve teste de interação ou navegação responsiva em navegador nesta execução, nem auditoria integral de acessibilidade.
