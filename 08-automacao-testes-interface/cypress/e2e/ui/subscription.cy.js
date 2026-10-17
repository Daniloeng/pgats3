import { faker } from '@faker-js/faker'
import { Footer } from '../../support/components/Footer'

describe('UI | Assinatura da newsletter', () => {
  let messages

  before(() => {
    cy.fixture('messages').then((data) => {
      messages = data
    })
  })

  beforeEach(() => {
    cy.visit('/')
  })

  context('Cenários felizes', () => {
    it('CT-UI-018 - Deve assinar a newsletter com e-mail válido', () => {
      Footer.subscribe(faker.internet.email())

      Footer.elements
        .successMessage()
        .should('be.visible')
        .and('contain', messages.subscriptionSuccess)
    })
  })

  context('Cenários alternativos', () => {
    it('CT-UI-019 - Não deve assinar a newsletter com e-mail inválido', () => {
      Footer.subscribe('email-invalido')

      Footer.elements
        .emailInput()
        .then(($input) => expect($input[0].validity.valid).to.equal(false))
      Footer.elements.successMessage().should('not.be.visible')
    })

    it('CT-UI-020 - Não deve assinar a newsletter com e-mail vazio', () => {
      Footer.subscribe('')

      Footer.elements
        .emailInput()
        .then(($input) => expect($input[0].validity.valueMissing).to.equal(true))
      Footer.elements.successMessage().should('not.be.visible')
    })
  })
})
