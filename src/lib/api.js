import siteConfig from '../../site.config.mjs'
import { onlyDigits } from './format'

export class ApiError extends Error {
  constructor(code, message) {
    super(message)
    this.code = code
  }
}

export function validateCNPJDigits(value) {
  const digits = onlyDigits(value)
  if (digits.length !== 14) {
    throw new ApiError('invalid_length', 'CNPJ inválido. Digite os 14 números do CNPJ.')
  }
  return digits
}

export async function fetchCNPJ(rawValue) {
  const digits = validateCNPJDigits(rawValue)

  let response
  try {
    response = await fetch(`${siteConfig.apiBaseUrl}/${digits}`)
  } catch {
    throw new ApiError('network', 'Erro de conexão. Verifique sua internet e tente novamente.')
  }

  if (response.status === 404) {
    throw new ApiError('not_found', 'CNPJ não encontrado. Verifique o número digitado.')
  }
  if (response.status === 400) {
    throw new ApiError('invalid', 'CNPJ inválido. Verifique se os números digitados estão corretos.')
  }
  if (response.status === 429) {
    throw new ApiError(
      'rate_limited',
      'Muitas consultas em pouco tempo. Aguarde um instante e tente novamente.'
    )
  }
  if (!response.ok) {
    throw new ApiError('unknown', 'Não foi possível consultar o CNPJ. Tente novamente mais tarde.')
  }

  return response.json()
}
