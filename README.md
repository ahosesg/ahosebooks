# AHOS Ebooks

Edição **1.0**, ainda não publicada, de **Minha empresa está no CBAM?**, da AHOS ESG. São 15 páginas A4 para diagnóstico preliminar de mercadoria e operação. Conteúdo e referências conferidos em **11/10/2026**.

## Estrutura

| Conteúdo | Arquivo / pasta |
| --- | --- |
| Textos e notas das 15 páginas | `src/content/cbam/*.md` |
| Edição e data da conferência | `src/data/edition.json` |
| Referências oficiais | `src/data/references.json` |
| Fotografia licenciada da capa | `src/data/images.json` e `public/images/` |
| Figuras editáveis | `src/components/BookFigure.astro` e `ProductIcon.astro` |
| Gráficos ilustrativos e dados | `public/figures/minimis.svg` e `src/data/chart-examples.json` |
| Reprodução dos gráficos | `scripts/create-figures.py` |
| Notas de rodapé | `src/components/PageNotes.astro` |
| Layout e paletas | `src/styles/book.css` e `src/data/design.json` |
| Árvore de decisão | `src/components/DecisionTree.astro` |
| PDF da edição | `public/downloads/minha-empresa-esta-no-cbam-edicao-1.0.pdf` |
| Auditoria do conteúdo | [docs/AUDITORIA_CONTEUDO_EDICAO_1.0.md](docs/AUDITORIA_CONTEUDO_EDICAO_1.0.md) |
| Revisão visual e evidências | [docs/VALIDACAO_EDICAO_1.0.md](docs/VALIDACAO_EDICAO_1.0.md) |

## Desenvolvimento e exportação

Use Node.js 24 e npm. Dependências e fontes são fixadas no lockfile.

```sh
npm ci
npm run assets
npm run dev
```

O Astro informa o endereço local; use o caminho `/ahosebooks/`. A interface oferece leitura contínua, sumário, prévia A4 e download. Não coleta dados.

```sh
npm run assets
npm run build
npx playwright install --with-deps chromium
npm run pdf
npm run verify:pdf
npm run build
```

O segundo build inclui o PDF atual no site estático. A exportação verifica geometria, paletas, fontes, notas, carregamento dos elementos visuais e ausência de fotografias internas e da ficha retirada. Relatórios e prévias ficam em `output/`; a inspeção das 15 páginas completa a revisão.

## Conteúdo e imagens

O objetivo é reconhecer exposição ao CBAM, sem calcular certificados, ensinar o preenchimento oficial ou certificar conformidade. R1 a R5, a árvore, a sequência de leitura e os casos são recursos didáticos da AHOS ESG. As regras são conferidas nas normas e guias indicados junto aos trechos e na bibliografia final.

A seção 12 distingue o diagnóstico do relatório do operador e da declaração CBAM. A ficha de preenchimento criada nas revisões anteriores foi retirada. A fotografia validada permanece somente na capa, com crédito e licença Pexels. Figuras maiores explicam setores, códigos, papéis, precursores e documentos; os dois gráficos usam dados explicitamente hipotéticos. Para reproduzi-los, instale matplotlib e execute `python scripts/create-figures.py`.

Strong permanece na capa e nas páginas 3, 6, 8, 10 e 14. O restante usa Light. Montserrat nos títulos e Inter no corpo, com fontes auto-hospedadas sob SIL Open Font License. Datas de revisão ficam apenas na última página; rodapés correntes exibem marca e paginação.

## Compilação e publicação

**Book · build and PDF** compila alterações de conteúdo e código na main e em pull requests. Preserva PDF, site e relatórios no artefato `ahos-cbam-ebook`, e versiona o PDF aprovado pelos checks na main. Isso não publica o site.

A publicação continua manual: **Settings → Pages → Source: GitHub Actions**, seguido de **Publish · GitHub Pages**. O endereço configurado é `https://ahosesg.github.io/ahosebooks/`; sua disponibilidade depende da ativação e de uma execução bem-sucedida. Esta revisão não executa a publicação.

**A edição permanece 1.0 durante a preparação para a primeira publicação.** Identificadores anteriores 1.0.0, 1.0.1 e 1.1.0 registraram revisões internas, sem representar edições publicadas. O histórico do Git preserva essas etapas. Código e textos não recebem uma licença de reutilização por esta entrega; fotografia e fontes mantêm suas licenças próprias.

## Revisão de linguagem de 12/10/2026

Esta branch contém uma revisão para exportadores iniciantes, com 16 páginas e termos explicados no contexto. O conteúdo aguarda validação do usuário. A edição publicada e o site AHOS ESG permanecem com os arquivos já aprovados.

`src/data/edition.json` identifica esta etapa como `review` e usa um nome de PDF separado. A compilação não substitui o PDF genérico da publicação. O workflow `review-exporter.yml` gera o arquivo e as evidências de diagramação sem publicar o site nem escrever em main.

Consulte `docs/REVISAO_LINGUAGEM_EXPORTADOR_2026-10-12.md` antes de incorporar esta revisão ao site.
