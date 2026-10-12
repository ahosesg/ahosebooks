# Revisão de linguagem para exportadores

Status: revisão para validação do usuário. O site AHOS ESG e os PDFs da edição publicada não devem ser atualizados nesta etapa.

Origem: edição 1.0, commit `9b48c6180a9bb241cde56f2672368bf3d3481ac6` de `ahosesg/ahosebooks`.

## Público e critério editorial

Exportador que precisa entender se sua venda é alcançada pelo CBAM e pode não conhecer a terminologia do mecanismo. Ao concluir a leitura, deve distinguir o papel do fabricante e do responsável na UE, identificar quais informações faltam e formular perguntas ao cliente sem interpretar este e-book como formulário ou comprovação de conformidade.

## Alterações

- Revisão de todos os capítulos e de textos, legendas e conclusões das figuras.
- Abertura centrada na dúvida do exportador, com explicação da finalidade do CBAM e dos possíveis pedidos de dados.
- Página adicional para consulta rápida de oito termos e distinção entre peso do produto e emissões. Total: 16 páginas A4.
- Definições no contexto para CN, NCM, trader, precursor, declarante, EORI, de minimis e regimes aduaneiros.
- Conclusões por extenso no lugar de categorias R1–R5.
- Explicação da diferença entre dados reais e valores padrão, sem sugerir que o fornecedor fora da UE assume automaticamente a obrigação de declarar.
- Regra dos 50 t explicada como total anual do importador, somando fornecedores e códigos dos produtos aos quais a isenção se aplica.
- Casos hipotéticos preservados, com linguagem voltada à venda e sem valores financeiros inventados.
- Capa, fotografia licenciada, fluxograma, tipografia e paletas preservados; texto de apresentação simplificado.
- Fotos apenas na capa, notas de rodapé e referências com links; sem siglas de fontes no rodapé corrente e sem ficha própria de preenchimento.

## Precisão e fontes

Foram mantidos os filtros da edição de origem: produto e código CN, destino e cadeia, exceções, regime de processamento na UE e total anual do importador. As isenções continuam condicionadas à comprovação; falta de informação não significa ausência de CBAM.

Guias oficiais 1 e 2, de 14/08/2026, e páginas da Comissão Europeia sustentam a explicação dos conceitos. O Guia 1 distingue as obrigações do declarante na UE da atuação dos produtores fora dela e admite valores padrão nas condições legais. O Guia 2 explica a cadeia de precursores, comunicação de dados e verificação dos dados reais. Regulamentos e lista de referências da edição de origem permanecem a base normativa; guias não substituem disposições legais.

## Arquivo e publicação

O arquivo de revisão é `minha-empresa-esta-no-cbam-revisao-2026-10-12.pdf`. A etapa `review` impede que a compilação substitua o PDF genérico publicado. A branch de revisão e seu workflow não publicam o site e não escrevem em `main`.

Depois de validação explícita do conteúdo, definir a edição pública e sua data, compilar o arquivo final, incorporar o PDF no site AHOS ESG e atualizar capa de apresentação, contagem de páginas, links e hashes dos recursos. Conferir o arquivo ao vivo após a publicação.
