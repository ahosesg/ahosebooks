# Processo editorial

## Atualizar uma edição

1. Revise as fontes oficiais e a data de corte antes de alterar regras, códigos, prazos ou exemplos.
2. Edite os textos em `src/content/cbam/`. Preserve uma página por arquivo e a sequência de 1 a 15. Altere títulos do sumário pelo campo `nav`.
3. Atualize os links em `src/data/references.json` e a identificação da edição em `src/data/edition.json`. A data de corte tem uma proteção explícita em `scripts/check-content.mjs`: revise essa proteção junto com as fontes, sem apenas removê-la.
4. Se a lógica do diagnóstico mudar, atualize `DecisionTree.astro`, os cinco resultados, os casos e as delimitações da seção 12 juntos.
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

Na leitura web o conteúdo se adapta à largura; a prévia A4 mantém a página fixa e permite rolagem horizontal em telas pequenas. O PDF usa a folha fixa. A edição 1.0 não oferece ficha de preenchimento. A seção 12 distingue o diagnóstico dos documentos previstos nas normas CBAM.

## Paletas por página

Edite `src/data/design.json` para distribuir as páginas entre Light e Strong. A cor não altera o conteúdo nem a geometria A4. O componente `BookPage.astro` aplica o tema e o CSS utiliza variáveis para fundo, texto, superfícies, tabelas, diagramas e rodapés.

Na edição 1.0, a capa e as páginas 3, 6, 8, 10 e 14 usam Strong. A árvore de decisão, a seção de documentos oficiais e as referências mantêm Light.

| Paleta | Fundo / superfícies | Texto | Destaque |
| --- | --- | --- | --- |
| Light | `#FFFFFF`, `#E7EFEA`, `#DDEBDF` | `#1A1F1D`, `#3A4A41`, `#174C39` | `#1F6B4F` |
| Strong | `#0F1713`, `#18221D`, `#2A3B33` | `#F4F5F2`, `#C9D7CD` | `#3FAE68` |

Deep Forest Green `#1F6B4F` permanece a âncora institucional nos dois modos. Verifique o contraste de todos os textos após mudar cores; não inverta apenas o fundo da página. Referência visual: documento-base AHOS ESG v3.0, de 27/09/2026, e ajuste solicitado em 08/10/2026.

## Evidências de geração

O workflow produz `content-report.json`, `print-report.json` e `pdf-report.json`. Eles verificam estrutura, dimensões, carregamento de fontes, colisões e links. Essa verificação não substitui a revisão visual ou regulatória. A existência de tags no PDF não equivale a uma auditoria completa de acessibilidade.

## Notas e elementos visuais

Adicione observações complementares ao campo `notes` no frontmatter da página, com `number`, `text`, `source` e `label`. A chamada no texto usa os IDs `chamada-PAGINA-NUMERO` e `nota-PAGINA-NUMERO`. A numeração reinicia em cada página. Mantenha a regra principal no corpo; notas não devem esconder exceções essenciais para o diagnóstico.

Não exiba as siglas de referências no rodapé corrente. A bibliografia completa permanece na última página. Datas de corte do conteúdo e de atualização editorial aparecem apenas nessa página; a versão pode aparecer na capa.

Para uma fotografia, registre autor, origem, licença, URL de download e hash aprovado em `src/data/images.json`. A edição usa fotografia somente na capa, com crédito e licença. Verifique licença e fotografia, não apenas o resultado de busca. A legenda indica seu uso ilustrativo. Fotos não substituem árvores, fluxos ou tabelas de regras.

Rode `npm run assets` antes do primeiro build. Ele reutiliza arquivos já presentes e verifica os hashes fixados. Versione as fotografias aprovadas junto com o código, preservando os direitos de seus autores. Na capa, confira a leitura de todos os textos sobre a fotografia e a presença do fluxograma.

## Preparação para a primeira publicação

A edição permanece 1.0 enquanto não publicada. Alterações preparatórias são registradas por commit e data, sem criar uma nova edição pública. Não execute o workflow manual de publicação até haver autorização.

O campo `figure` no frontmatter seleciona figuras editáveis em `BookFigure.astro`. Textos introdutórios ficam em `intro`; explicações e chamadas das notas permanecem no Markdown. O gráfico de minimis usa dados explicitamente hipotéticos em `chart-examples.json`. Após mudar os dados ou o script, regenere o SVG com `python scripts/create-figures.py`, confira unidades, totalizações, referência de 50 t e legibilidade. Não acrescente estatísticas apenas para preencher espaço.

Consulte a matriz `AUDITORIA_CONTEUDO_EDICAO_1.0.md` ao mudar afirmações ou exemplos. Regras, sugestões editoriais, modelos oficiais e categorias didáticas devem permanecer distinguíveis.
