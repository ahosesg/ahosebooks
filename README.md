# AHOS Ebooks

Edição web e PDF A4 de **Minha empresa está no CBAM?**, da AHOS ESG. São 15 páginas com diagnóstico por produto, cliente e operação, árvore de decisão, casos e ficha para preenchimento. Data de corte editorial: **08/10/2026**.

## Estrutura

| Conteúdo | Arquivo / pasta |
| --- | --- |
| Textos das 15 páginas | `src/content/cbam/*.md` |
| Edição e versão | `src/data/edition.json` |
| Fontes oficiais e links | `src/data/references.json` |
| Fotografias, autores e licenças | `src/data/images.json` e `public/images/` |
| Notas de rodapé | Campo `notes` nos textos e `src/components/PageNotes.astro` |
| Cores, tipografia e A4 | `src/styles/book.css` |
| Distribuição Strong / Light | `src/data/design.json` |
| Árvore de decisão editável | `src/components/DecisionTree.astro` |
| Ilustração vetorial da capa | `src/components/CoverGraphic.astro` |
| PDF aprovado da edição | `public/downloads/minha-empresa-esta-no-cbam-v1.1.0.pdf` |
| Processo editorial | `docs/PROCESSO_EDITORIAL.md` |
| Validação da revisão atual | [docs/VALIDACAO_1.1.0.md](docs/VALIDACAO_1.1.0.md) |

## Desenvolvimento

Use Node.js 24 e npm. As versões das dependências e das fontes estão fixadas no `package-lock.json`.

```sh
npm ci
npm run assets
npm run dev
```

Abra o endereço informado pelo Astro, com o caminho `/ahosebooks/`. A interface oferece leitura contínua, sumário, prévia A4 e download do PDF. Os textos também podem ser editados diretamente no GitHub. Não há cadastro, envio de dados ou serviços externos de fontes.

## Gerar o e-book

```sh
npm run assets
npm run build
npx playwright install --with-deps chromium
npm run pdf
npm run verify:pdf
npm run build
```

O segundo build inclui o novo PDF em `dist/`. O exportador usa o mesmo HTML, CSS e fontes da edição web, com regras de impressão. Ele interrompe a geração se detectar conteúdo fora da página, colisão com rodapé ou fontes ausentes. Os relatórios e as prévias das páginas ficam em `output/`. A exportação também verifica os fundos Strong, o carregamento das fotografias, os links das notas e a ausência das antigas siglas nos rodapés. Confira visualmente as 15 páginas antes de aprovar uma nova edição.

## GitHub Actions e publicação

O workflow **Book · build and PDF** verifica e compila o livro em cada alteração de conteúdo ou código na `main`, e nas pull requests. O artefato `ahos-cbam-ebook` contém PDF, site estático e relatórios, com retenção de 90 dias. Após a exportação passar, o workflow versiona o PDF e as fotografias na `main`, sem publicar o site. Alterações somente nesses arquivos não iniciam outra geração. A aprovação visual continua necessária para a entrega.

Para publicar: ative **Settings → Pages → Source: GitHub Actions** e execute **Publish · GitHub Pages** na aba Actions. O endereço previsto pela configuração é `https://ahosesg.github.io/ahosebooks/`; sua disponibilidade depende da ativação e de uma execução bem-sucedida. O workflow é manual para permitir conferir cada edição antes da publicação.

## Identidade e revisão

Marca tipográfica AHOS ESG, paleta verde definida no briefing, Montserrat nos títulos e Inter no corpo. As fontes são auto-hospedadas, distribuídas pelos pacotes Fontsource sob SIL Open Font License. Esta aplicação tipográfica é uma escolha editorial, não uma declaração de manual oficial de marca.

A edição 1.1.0 combina **Light** e **Strong**, usando as cores confirmadas no documento-base AHOS ESG v3.0. Strong ocupa a capa e as páginas 3, 6, 8, 10 e 14, com fundo Green Black, superfícies Graphite Green/Dark Moss, textos Off White/Light Sage e Vibrant Leaf em destaques pontuais. A distribuição é editável em `src/data/design.json`; as cores ficam no CSS. O tema de cada página é o mesmo na web e no PDF. A árvore de decisão, a ficha e as referências permanecem claras. A capa tem fotografia de fundo, título e fluxograma preservados. As imagens internas possuem créditos clicáveis. Notas numeradas relacionam observações e fontes aos trechos correspondentes; o rodapé corrente contém apenas marca e número da página. Datas de atualização aparecem somente na última página.

REG + ALT + G1 + G2 sustentam o conteúdo. Os guias não substituem o regulamento. Propostas são indicadas como propostas. Este material é educativo e oferece diagnóstico preliminar; não constitui parecer jurídico ou certificação de conformidade.

Código e textos deste repositório não recebem uma licença de reutilização por esta entrega. As fontes tipográficas mantêm suas licenças próprias. Fotografias seguem a licença Pexels, com autor, página de origem e licença registrados no manifesto. Os arquivos aprovados são mantidos no repositório para que a exportação não dependa de downloads externos; `npm run assets` baixa somente arquivos ausentes e verifica seu hash quando fixado. Consulte [docs/IMAGENS.md](docs/IMAGENS.md). O nome do PDF inclui a edição; a URL de download original continua disponível com a versão atual.
