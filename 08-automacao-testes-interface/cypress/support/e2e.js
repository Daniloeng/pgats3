// Arquivo carregado automaticamente antes de cada spec.
import 'cypress-mochawesome-reporter/register'
import './commands'

// O site de testes carrega scripts de terceiros (anúncios) que lançam exceções
// não relacionadas à aplicação. Ignoramos apenas esses casos para não mascarar erros reais.
Cypress.on('uncaught:exception', (err) => {
  const thirdPartyErrors = [/adsbygoogle/i, /googletag/i, /Script error/i, /ResizeObserver/i]
  if (thirdPartyErrors.some((pattern) => pattern.test(err.message))) {
    return false
  }
  return true
})
