// Configuração central do site. Editar aqui em vez de espalhar valores
// pelo código — usado pelo vite.config.js, pelos scripts de deploy e
// pelos componentes React (PasswordGate, App).
export default {
  siteName: 'Consulta completa CNPJ',
  subtitle:
    'Dados cadastrais, societários e fiscais em um único lugar (Use com responsabilidade e ética)',

  // Caminho público do GitHub Pages (deve bater com o nome do repositório).
  basePath: '/consulta-cnpj/restrito/',
  outDir: 'dist/restrito',

  // Gerada com: node -e "console.log(require('crypto').createHash('sha256').update('SENHA').digest('hex'))"
  passwordHash: 'd919fd01d264c21b0504467fffba5265aa8bb0587efe78e80d68beea0956dd16',
  storageKey: 'consulta-cnpj-restrito-auth',

  apiBaseUrl: 'https://publica.cnpj.ws/cnpj',
}
