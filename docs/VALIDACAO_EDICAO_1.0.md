# Validação da edição 1.0 antes da publicação

Revisão encerrada em 11/10/2026. A primeira edição continua identificada como **1.0**. A publicação do site não foi executada.

## Conteúdo

A [auditoria de conteúdo](AUDITORIA_CONTEUDO_EDICAO_1.0.md) registra a comparação com os regulamentos e guias oficiais do CBAM, por página e seção. O conteúdo é adequado ao propósito de diagnóstico preliminar de mercadoria e operação, com distinção entre regras oficiais, sugestões e organização didática AHOS ESG.

A ficha da antiga seção 12 foi retirada. A nova seção distingue o diagnóstico do e-book, o relatório do operador para emissões reais e a declaração anual CBAM. Ela remete ao art. 10 e ao Anexo IV da metodologia 2025/2547 e ao art. 6 do regulamento 2023/956, sem apresentar um formulário próprio como exigência oficial. R1 a R5 estão identificados como categorias didáticas.

## Revisão visual

- As 15 páginas do PDF final foram renderizadas com Poppler e inspecionadas individualmente.
- A capa validada, sua fotografia e o fluxograma foram preservados; a identificação da edição foi corrigida para 1.0.
- A fotografia aparece somente na capa, com crédito ao fotógrafo e à Pexels na capa e na bibliografia final.
- Cinco figuras maiores explicam setores, estrutura de códigos, papéis na cadeia, precursores e documentos. Dois gráficos adicionais ilustram a agregação anual e a ultrapassagem de 50 t, com dados explicitamente hipotéticos. Os blocos têm fonte e autoria junto ao elemento.
- Strong permanece nas páginas 1, 3, 6, 8, 10 e 14; Light nas demais. Montserrat e Inter foram carregadas corretamente.
- Há 14 notas de rodapé em 11 páginas, com links de ida e retorno preservados. Os rodapés correntes contêm marca e paginação, sem a antiga linha de siglas de fontes.
- A data de revisão aparece somente na última página. A parte de cadernos AHOS não aparece no PDF.
- Não foram encontrados cortes, sobreposições ou colisões entre texto, figuras, notas e rodapés. O medidor geométrico da página 13 registra 2 px de variação, dentro da tolerância de exportação; a renderização foi conferida visualmente.

## Compilação e arquivo entregue

Compilação e verificações concluídas com sucesso na [execução 38143949707](https://github.com/ahosesg/ahosebooks/actions/runs/38143949707), sobre o commit de conteúdo `db9833ebb1a3f6420c5cc5791896f9123ff64928`. O commit `b5ae4f80d2211f7e08aebf5ee707427ea1785dd4` versionou o PDF compilado. O arquivo entregue foi comparado com o blob do GitHub e corresponde exatamente ao arquivo do repositório.

| Verificação | Resultado |
| --- | --- |
| Edição | 1.0 |
| Formato | 15 páginas A4 |
| Arquivo | `public/downloads/minha-empresa-esta-no-cbam-edicao-1.0.pdf` |
| Tamanho | 1.204.047 bytes |
| SHA-256 | `ae04429aaf44347bd7b7f17ce8c0ddae63fae4b6245c4e04c6ac0b7249b6d6b8` |
| Links no PDF | 70: 42 externos e 28 internos |
| PDF sem edição no nome | Idêntico ao PDF da edição 1.0 |
| Publicação | Não executada |

## Evidências

- [Conteúdo e notas por página](validacao/edicao-1.0/content-report.json)
- [Geometria, fontes, paletas e elementos visuais](validacao/edicao-1.0/print-report.json)
- [Formato A4, links e integridade do PDF](validacao/edicao-1.0/pdf-report.json)
- [Fotografia, autoria, licença e integridade](validacao/edicao-1.0/assets-report.json)
- [Conferência editorial e correspondência com o GitHub](validacao/edicao-1.0/editorial-check.json)

Os registros anteriores 1.0.0, 1.0.1 e 1.1.0 permanecem como histórico de revisões internas. Não representam edições publicadas.
