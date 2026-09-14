# Consulta completa CNPJ

App em React + Vite + Tailwind CSS para consultar dados cadastrais, societários
e fiscais de empresas a partir do CNPJ, usando a API pública e gratuita
[publica.cnpj.ws](https://publica.cnpj.ws/cnpj/{cnpj}) (sem chave/autenticação).

## Rodando localmente

```bash
npm install
npm run dev
```

## Funcionalidades

- Busca por CNPJ com máscara em tempo real, validação de 14 dígitos e
  tratamento de erros (CNPJ inválido, não encontrado, limite de requisições).
- Card com razão social, nome fantasia, situação cadastral, porte, natureza
  jurídica, capital social, atividade principal, endereço, telefone e e-mail.
- Atividades secundárias e quadro societário (quando existirem).
- Visualização do JSON completo retornado pela API.

### Exclusão de MEI

Por definição do projeto, **empresas no regime de Microempreendedor
Individual (MEI) são excluídas da base de consulta**: se o CNPJ pesquisado
for MEI (`simples.mei.optante`), a ferramenta mostra apenas um aviso, sem
exibir o card de dados.

### Consulta avançada (CNAE / regime tributário)

Seção "Consulta avançada", no rodapé da página, permite:

- Consultar vários CNPJs de uma vez (colados em lote).
- Filtrar os resultados por CNAE (código ou descrição) e por regime
  tributário: **Simples Nacional** ou **fora do Simples**.
- MEI é sempre excluído automaticamente do lote.

**Limitação importante:** a API pública não tem endpoint de busca por CNAE
(só consulta um CNPJ por vez), e a base de CNPJ **não divulga** se uma
empresa fora do Simples apura pelo **Lucro Real** ou **Lucro Presumido** —
essa é uma escolha contábil interna, não um dado público. Por isso a
ferramenta classifica apenas "Simples Nacional" x "Fora do Simples (Lucro
Presumido ou Real)", sem diferenciar os dois últimos.

### Situação fiscal / dívida ativa

Não existe API pública gratuita para consultar dívida ativa por CNPJ em
tempo real (os dados abertos da PGFN são publicados em lote, não como um
serviço de consulta). Por isso, cada resultado traz links diretos para os
canais oficiais de verificação:

- [PGFN — Regularize](https://www.regularize.pgfn.gov.br/)
- [Receita Federal — Certidão Negativa de Débitos (PJ)](https://solucoes.receita.fazenda.gov.br/Servicos/certidaointernet/PJ/Emitir)

## Uso responsável

Os dados consultados são públicos, mas devem ser usados com responsabilidade
e ética, conforme indicado na própria página.
