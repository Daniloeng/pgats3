import { buildUser } from '../../support/factories/userFactory'
import { AutomationExerciseApi as api } from '../../support/api/automationExerciseApi'
import { Header } from '../../support/components/Header'
import { LoginPage } from '../../support/pages/LoginPage'
import { SignupPage } from '../../support/pages/SignupPage'

describe('UI | Cadastro de usuário', () => {
  let messages

  before(() => {
    cy.fixture('messages').then((data) => {
      messages = data
    })
  })

  context('Cenários felizes', () => {
    it('CT-UI-001 - Deve cadastrar um novo usuário e excluir a conta em seguida', () => {
      const user = buildUser()

      LoginPage.visit()
      LoginPage.elements.signupTitle().should('be.visible')
      LoginPage.startSignup(user.name, user.email)

      SignupPage.fillAccountInformation(user)
      SignupPage.submit()

      SignupPage.elements.accountCreated().should('have.text', messages.accountCreated)
      SignupPage.continue()
      Header.loggedInAs().should('contain', user.name)

      Header.deleteAccount()
      SignupPage.elements.accountDeleted().should('have.text', messages.accountDeleted)
    })
  })

  context('Cenários alternativos', () => {
    let existingUser

    beforeEach(() => {
      existingUser = buildUser()
      api.createAccount(existingUser).its('body.responseCode').should('eq', 201)
    })

    afterEach(() => {
      api.deleteAccount(existingUser.email, existingUser.password)
    })

    it('CT-UI-002 - Não deve permitir cadastro com e-mail já existente', () => {
      LoginPage.visit()
      LoginPage.startSignup('Outro Nome', existingUser.email)

      LoginPage.elements.formError(messages.emailAlreadyExists).should('be.visible')
      cy.location('pathname').should('eq', '/signup')
      SignupPage.elements.title().should('not.exist')
    })
  })
})
