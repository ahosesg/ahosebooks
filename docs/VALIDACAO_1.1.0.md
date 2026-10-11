# Validação da edição 1.1.0

Revisão editorial e visual realizada em 11/10/2026. O conteúdo regulatório mantém a data de corte de 08/10/2026.

## Resultado

- 15 páginas A4 verticais, com o conteúdo do diagnóstico, a árvore, os quatro casos e a ficha preservados.
- Strong na capa e nas páginas 3, 6, 8, 10 e 14; Light nas demais. Fundo Strong `#0F1713`, texto `#F4F5F2` e contrastes medidos no relatório.
- Capa com fotografia gratuita, título, marca e fluxograma; retirada a identificação de cadernos e a data de atualização.
- Quatro fotografias licenciadas, usadas na capa e nas páginas 2, 6, 8 e 12. Crédito clicável junto a cada imagem e na última página. Origem, licença e hashes fixados no manifesto.
- 12 notas de rodapé em 10 páginas, com chamadas numéricas, links de retorno e referências legíveis.
- Rodapés correntes com marca e paginação, sem listas de siglas de fontes. Bibliografia completa na última página.
- Datas de corte do conteúdo e de atualização editorial somente na última página.

## Verificação

A compilação Astro e a exportação Playwright verificaram estrutura, fontes, dimensões, fotografias, paletas, chamadas de notas e espaço disponível. A extração com pypdf confirmou 59 links, incluindo 24 destinos internos, e ausência de URLs do servidor local. Os 15 PNGs renderizados com Poppler foram inspecionados visualmente, página a página, incluindo tabelas, notas, créditos e rodapés.

As páginas 2, 5, 6, 8 e 9 são mais densas e receberam revisão específica da separação entre conteúdo, notas e rodapé. Uma variação inferior a um pixel no limite do contêiner da página 8 decorre do arredondamento da geometria de impressão; a nota permanece separada do texto por sua regra e pelo espaço previsto, sem colisão ou corte no PDF.

As regras de enquadramento não foram reavaliadas nesta revisão visual. Fotografias são ilustrativas e não representam as empresas dos casos. A ficha continua destinada a preenchimento manual, sem campos digitais de formulário.

## Evidências

Relatórios em `docs/validacao/1.1.0/`: conteúdo, impressão, PDF, fotografias, contrastes e conferência editorial. O PDF com nome de versão próprio está em `public/downloads/minha-empresa-esta-no-cbam-v1.1.0.pdf`; a URL original também contém a versão atual.
Compilação final: [GitHub Actions, execução 38140652280](https://github.com/ahosesg/ahosebooks/actions/runs/38140652280), concluída com sucesso. SHA-256 do PDF: `386c680f514d5716271360584b085741376e157ceb30c80aa0c914492fe7944e`.
