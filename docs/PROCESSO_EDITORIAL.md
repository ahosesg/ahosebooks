# Processo editorial

## Atualizar uma edição

1. Revise as fontes oficiais e a data de corte antes de alterar regras, códigos, prazos ou exemplos.
2. Edite os textos em `src/content/cbam/`. Preserve uma página por arquivo e a sequência de 1 a 15. Altere títulos do sumário pelo campo `nav`.
3. Atualize os links em `src/data/references.json` e a versão em `src/data/edition.json`. A data de corte tem uma proteção explícita em `scripts/check-content.mjs`: revise essa proteção junto com as fontes, sem apenas removê-la.
4. Se a lógica do diagnóstico mudar, atualize `DecisionTree.astro`, os cinco resultados, os casos e a ficha juntos.
5. Abra uma branch e uma pull request, execute o workflow e leia os relatórios. Inspecione o PDF página a página, com atenção a tabelas, quebras, rodapés e símbolos.
6. Após aprovação editorial, atualize o PDF versionado, integre a alteração e publique a edição. Registre a revisão em `CHANGELOG.md`.

## Critérios de revisão

- O enquadramento é por mercadoria e operação, nunca por nome da empresa.
- A CN de oito dígitos não é presumida a partir da NCM.
- O limite de 50 t é anual e agregado por importador; hidrogênio e eletricidade estão excluídos da isenção.
- A ultrapassagem alcança o ano inteiro, não apenas o excedente.
- Trader, precursor, importador e declarante têm papéis distintos.
- Propostas não são descritas como obrigações vigentes.
- Origem, exceções e regimes aduaneiros possuem evidências identificadas.
- As fontes citadas sustentam a afirmação e a edição indica sua data de corte.

## Layout e exportação

A A4 tem 210 × 297 mm. A geometria de impressão usa margens internas de 18 mm, com rodapé reservado. Corpo de 11,3 pt, títulos de 25 pt e notas de pelo menos 9 pt. A capa usa outra escala. Os elementos especiais têm texto HTML ou SVG editável. Prefira cortar repetição e reorganizar o conteúdo antes de reduzir fontes.

Na leitura web o conteúdo se adapta à largura; a prévia A4 mantém a página fixa e permite rolagem horizontal em telas pequenas. O PDF usa a folha fixa. A ficha é destinada a preenchimento manual ou adaptação editorial; o PDF não contém campos digitais de formulário.

## Paletas por página

Edite `src/data/design.json` para distribuir as páginas entre Light e Strong. A cor não altera o conteúdo nem a geometria A4. O componente `BookPage.astro` aplica o tema e o CSS utiliza variáveis para fundo, texto, superfícies, tabelas, diagramas e rodapés.

Na revisão 1.0.1, as páginas 3, 6, 8, 10 e 14 usam Strong. A capa, a árvore de decisão, a ficha de diagnóstico e as referências mantêm Light. O preenchimento manual da ficha continua sobre fundo branco.

| Paleta | Fundo / superfícies | Texto | Destaque |
| --- | --- | --- | --- |
| Light | `#FFFFFF`, `#E7EFEA`, `#DDEBDF` | `#1A1F1D`, `#3A4A41`, `#174C39` | `#1F6B4F` |
| Strong | `#0F1713`, `#18221D`, `#2A3B33` | `#F4F5F2`, `#C9D7CD` | `#3FAE68` |

Deep Forest Green `#1F6B4F` permanece a âncora institucional nos dois modos. Verifique o contraste de todos os textos após mudar cores; não inverta apenas o fundo da página. Referência visual: documento-base AHOS ESG v3.0, de 27/09/2026, e ajuste solicitado em 08/10/2026.

## Evidências de geração

O workflow produz `content-report.json`, `print-report.json` e `pdf-report.json`. Eles verificam estrutura, dimensões, carregamento de fontes, colisões e links. Essa verificação não substitui a revisão visual ou regulatória. A existência de tags no PDF não equivale a uma auditoria completa de acessibilidade.
