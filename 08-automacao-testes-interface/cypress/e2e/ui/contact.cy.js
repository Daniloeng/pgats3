import { faker } from '@faker-js/faker'
import { ContactPage } from '../../support/pages/ContactPage'

describe('UI | Fale conosco (Contact Us)', () => {
  let messages

  before(() => {
    cy.fixture('messages').then((data) => {
      messages = data
    })
  })

  beforeEach(() => {
    ContactPage.visit()
  })

  const buildContact = (overrides = {}) => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    subject: 'Dúvida sobre pedido',
    message: faker.lorem.sentences(2),
    ...overrides,
  })

  context('Cenários felizes', () => {
    it('CT-UI-016 - Deve enviar o formulário de contato com anexo', () => {
      ContactPage.fill(buildContact({ file: 'cypress/fixtures/upload-sample.txt' }))
      // O site exibe um window.confirm; o Cypress confirma automaticamente, mas validamos o texto.
      cy.on('window:confirm', (text) => {
        expect(text).to.equal('Press OK to proceed!')
        return true
      })
      ContactPage.submit()

      ContactPage.elements
        .successMessage()
        .should('be.visible')
        .and('have.text', messages.contactSuccess)
    })
  })

  context('Cenários alternativos', () => {
    it('CT-UI-017 - Não deve enviar o formulário com e-mail em formato inválido', () => {
      ContactPage.fill(buildContact({ email: 'email-invalido' }))
      ContactPage.submit()

      ContactPage.elements
        .email()
        .then(($input) => expect($input[0].validity.typeMismatch).to.equal(true))
      ContactPage.elements.successMessage().should('not.exist')
    })
  })
})
