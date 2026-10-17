import Ajv from 'ajv'
import { LoginPage } from './pages/LoginPage'
import { Header } from './components/Header'

const ajv = new Ajv({ allErrors: true })

/**
 * Faz login pela UI e guarda a sessão em cache com cy.session,
 * evitando repetir o fluxo de login em cada teste.
 * @param {string} email
 * @param {string} password
 */
Cypress.Commands.add('loginViaUi', (email, password) => {
  cy.session(
    ['ui-login', email],
    () => {
      LoginPage.visit()
      LoginPage.login(email, password)
      Header.loggedInAs().should('be.visible')
    },
    {
      validate() {
        cy.request('/').its('body').should('include', 'Logged in as')
      },
    },
  )
})

/**
 * Valida o subject (objeto JSON) contra um JSON Schema.
 * Uso: cy.wrap(body).validateSchema(schema)
 */
Cypress.Commands.add('validateSchema', { prevSubject: true }, (subject, schema) => {
  const validate = ajv.compile(schema)
  const valid = validate(subject)
  expect(valid, `Contrato inválido: ${ajv.errorsText(validate.errors)}`).to.equal(true)
  return cy.wrap(subject, { log: false })
})

/**
 * Digita um valor sem exibi-lo no Command Log (senhas, cartões etc.).
 */
Cypress.Commands.add('typeSensitive', { prevSubject: 'element' }, (subject, value) => {
  return cy.wrap(subject).type(value, { log: false })
})
