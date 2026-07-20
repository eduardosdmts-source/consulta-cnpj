export function onlyDigits(value) {
  return (value || '').replace(/\D/g, '')
}

export function maskCNPJ(value) {
  const digits = onlyDigits(value).slice(0, 14)

  if (digits.length > 12) {
    return digits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2}).*/, '$1.$2.$3/$4-$5')
  }
  if (digits.length > 8) {
    return digits.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4}).*/, '$1.$2.$3/$4')
  }
  if (digits.length > 5) {
    return digits.replace(/^(\d{2})(\d{3})(\d{0,3}).*/, '$1.$2.$3')
  }
  if (digits.length > 2) {
    return digits.replace(/^(\d{2})(\d{0,3}).*/, '$1.$2')
  }
  return digits
}

export function formatCNPJDigits(digits) {
  if (!digits || digits.length !== 14) return digits || '—'
  return digits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
}

export function formatCEP(cep) {
  const digits = onlyDigits(cep)
  if (digits.length !== 8) return cep || ''
  return digits.replace(/^(\d{5})(\d{3})$/, '$1-$2')
}

export function formatCurrencyBRL(value) {
  const number = typeof value === 'string' ? parseFloat(value) : value
  if (value === null || value === undefined || Number.isNaN(number)) return '—'
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number)
}

export function formatDateBR(dateStr) {
  if (!dateStr) return '—'
  const [year, month, day] = String(dateStr).split('-')
  if (!year || !month || !day) return dateStr
  return `${day}/${month}/${year}`
}

export function formatPhone(ddd, phone) {
  if (!ddd || !phone) return null
  return `(${ddd}) ${phone}`
}

export function formatEndereco(estabelecimento) {
  if (!estabelecimento) return '—'
  const {
    tipo_logradouro,
    logradouro,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
    cep,
  } = estabelecimento

  const rua = [tipo_logradouro, logradouro].filter(Boolean).join(' ')
  const linhaBase = [rua, numero].filter(Boolean).join(', ')
  const linha1 = complemento ? `${linhaBase} - ${complemento}` : linhaBase

  const cidadeNome = cidade?.nome
  const estadoSigla = estado?.sigla
  const cidadeUf = [cidadeNome, estadoSigla].filter(Boolean).join(' - ')

  const partes = [linha1, bairro, cidadeUf].filter(Boolean)
  const cepFormatado = formatCEP(cep)
  if (cepFormatado) partes.push(cepFormatado)

  return partes.length > 0 ? partes.join(', ') : '—'
}

export function getSituacaoCadastral(estabelecimento) {
  const situacao = estabelecimento?.situacao_cadastral
  if (!situacao) return '—'
  if (typeof situacao === 'string') return situacao
  return situacao.descricao || '—'
}

export function isSituacaoAtiva(estabelecimento) {
  return getSituacaoCadastral(estabelecimento).trim().toUpperCase() === 'ATIVA'
}

export function getAtividadePrincipal(data) {
  const principal = data?.estabelecimento?.atividade_principal
  return principal?.descricao || data?.estabelecimento?.cnae_fiscal_descricao || '—'
}
