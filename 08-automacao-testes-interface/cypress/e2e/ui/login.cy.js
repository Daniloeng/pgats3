import { buildUser } from '../../support/factories/userFactory'
import { AutomationExerciseApi as api } from '../../support/api/automationExerciseApi'
import { Header } from '../../support/components/Header'
import { LoginPage } from '../../support/pages/LoginPage'

describe('UI | Login e Logout', () => {
  let user
  let messages

  before(() => {
    cy.fixture('messages').then((data) => {
      messages = data
    })
  })

  beforeEach(() => {
    // Pré-condição criada via API: mais rápido e independente da UI de cadastro.
    user = buildUser()
    api.createAccount(user).its('body.responseCode').should('eq', 201)
    LoginPage.visit()
  })

  afterEach(() => {
    api.deleteAccount(user.email, user.password)
  })

  context('Cenários felizes', () => {
    it('CT-UI-003 - Deve realizar login com credenciais válidas', () => {
      LoginPage.login(user.email, user.password)

      Header.loggedInAs().should('be.visible').and('contain', user.name)
      Header.elements.logout().should('be.visible')
    })

    it('CT-UI-004 - Deve realizar logout e retornar à página de login', () => {
      LoginPage.login(user.email, user.password)
      Header.loggedInAs().should('be.visible')

      Header.logout()

      cy.location('pathname').should('eq', '/login')
      Header.elements.signupLogin().should('be.visible')
      Header.elements.logout().should('not.exist')
    })
  })

  context('Cenários alternativos', () => {
    it('CT-UI-005 - Não deve realizar login com senha incorreta', () => {
      LoginPage.login(user.email, 'senha-incorreta-123')

      LoginPage.elements.formError(messages.loginInvalid).should('be.visible')
      Header.elements.logout().should('not.exist')
    })

    it('CT-UI-006 - Não deve realizar login com e-mail não cadastrado', () => {
      LoginPage.login(`nao.cadastrado.${Date.now()}@test.com`, user.password)

      LoginPage.elements.formError(messages.loginInvalid).should('be.visible')
      Header.elements.logout().should('not.exist')
    })

    it('CT-UI-007 - Não deve submeter o login com campos obrigatórios vazios', () => {
      LoginPage.login()

      LoginPage.elements
        .loginEmail()
        .then(($input) => expect($input[0].validity.valueMissing).to.equal(true))
      cy.location('pathname').should('eq', '/login')
      Header.elements.logout().should('not.exist')
    })
  })
})
