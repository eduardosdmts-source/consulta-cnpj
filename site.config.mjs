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
  passwordHash: 'e3cce0f6889c3fc85c68954cc3e03364895ffae5c6ddd9cd18c01151920f0d3b',
  storageKey: 'consulta-cnpj-restrito-auth',

  apiBaseUrl: 'https://publica.cnpj.ws/cnpj',
}
