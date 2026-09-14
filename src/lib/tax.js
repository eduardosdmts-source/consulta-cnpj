// A base pública de CNPJ não informa em qual regime de apuração (Lucro Real ou
// Lucro Presumido) uma empresa fora do Simples Nacional está — essa escolha é
// feita internamente pela contabilidade da empresa e não é um dado público.
// Por isso classificamos apenas: MEI, Simples Nacional, ou "fora do Simples"
// (universo que inclui tanto Lucro Real quanto Lucro Presumido).

export const REGIME_MEI = 'mei'
export const REGIME_SIMPLES = 'simples'
export const REGIME_FORA_SIMPLES = 'fora_simples'

export function isMEI(data) {
  return Boolean(data?.simples?.mei?.optante)
}

export function isSimplesOptante(data) {
  return Boolean(data?.simples?.simples?.optante)
}

export function getRegimeTributario(data) {
  if (isMEI(data)) return REGIME_MEI
  if (isSimplesOptante(data)) return REGIME_SIMPLES
  return REGIME_FORA_SIMPLES
}

export function getRegimeLabel(regime) {
  switch (regime) {
    case REGIME_MEI:
      return 'MEI'
    case REGIME_SIMPLES:
      return 'Simples Nacional'
    case REGIME_FORA_SIMPLES:
      return 'Fora do Simples (Lucro Presumido ou Real)'
    default:
      return '—'
  }
}

// Não existe API pública gratuita para consultar dívida ativa por CNPJ em
// tempo real (os dados abertos da PGFN são arquivos em lote, não uma API
// consultável). Por isso apontamos para os canais oficiais de verificação.
export const DEBT_CHECK_LINKS = [
  {
    label: 'PGFN — Regularize (situação fiscal e dívida ativa da União)',
    url: 'https://www.regularize.pgfn.gov.br/',
  },
  {
    label: 'Receita Federal — Certidão Negativa de Débitos (PJ)',
    url: 'https://solucoes.receita.fazenda.gov.br/Servicos/certidaointernet/PJ/Emitir',
  },
]
