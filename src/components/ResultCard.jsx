import StatusBadge from './StatusBadge'
import InfoItem from './InfoItem'
import {
  IdCardIcon,
  TagIcon,
  CalendarIcon,
  ScaleIcon,
  DollarIcon,
  BriefcaseIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
} from './icons'
import {
  formatCNPJDigits,
  formatCurrencyBRL,
  formatDateBR,
  formatEndereco,
  formatPhone,
  getSituacaoCadastral,
  isSituacaoAtiva,
  getAtividadePrincipal,
} from '../lib/format'

export default function ResultCard({ data }) {
  const estabelecimento = data.estabelecimento || {}
  const situacao = getSituacaoCadastral(estabelecimento)
  const ativa = isSituacaoAtiva(estabelecimento)
  const telefone = formatPhone(estabelecimento.ddd1, estabelecimento.telefone1)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
            {data.razao_social || '—'}
          </h2>
          {estabelecimento.nome_fantasia && (
            <p className="text-slate-500 mt-1">{estabelecimento.nome_fantasia}</p>
          )}
        </div>
        <StatusBadge situacao={situacao} isAtiva={ativa} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoItem
          icon={<IdCardIcon />}
          label="CNPJ"
          value={formatCNPJDigits(estabelecimento.cnpj)}
        />
        <InfoItem icon={<TagIcon />} label="Porte" value={data.porte?.descricao} />
        <InfoItem
          icon={<CalendarIcon />}
          label="Data de abertura"
          value={formatDateBR(estabelecimento.data_inicio_atividade)}
        />
        <InfoItem
          icon={<ScaleIcon />}
          label="Natureza jurídica"
          value={data.natureza_juridica?.descricao}
        />
        <InfoItem
          icon={<DollarIcon />}
          label="Capital social"
          value={formatCurrencyBRL(data.capital_social)}
        />
        <InfoItem
          icon={<BriefcaseIcon />}
          label="Atividade principal"
          value={getAtividadePrincipal(data)}
        />
        <InfoItem
          icon={<MapPinIcon />}
          label="Endereço"
          value={formatEndereco(estabelecimento)}
          wide
        />
        <InfoItem icon={<PhoneIcon />} label="Telefone" value={telefone} />
        <InfoItem icon={<MailIcon />} label="E-mail" value={estabelecimento.email} />
      </div>
    </div>
  )
}
