import { buildUser } from '../../support/factories/userFactory'
import { AutomationExerciseApi as api } from '../../support/api/automationExerciseApi'

describe('API | Conta de usuário', () => {
  let messageSchema

  before(() => {
    cy.fixture('schemas/message.schema.json').then((schema) => {
      messageSchema = schema
    })
  })

  context('Criação de conta', () => {
    let user

    afterEach(() => {
      api.deleteAccount(user.email, user.password)
    })

    it('CT-API-004 - POST /createAccount deve criar uma nova conta', () => {
      user = buildUser()

      api.createAccount(user).then(({ status, body }) => {
        expect(status).to.eq(200)
        cy.wrap(body).validateSchema(messageSchema)
        expect(body).to.deep.equal({ responseCode: 201, message: 'User created!' })
      })
    })
  })

  context('Operações sobre uma conta existente', () => {
    let user

    beforeEach(() => {
      user = buildUser()
      api.createAccount(user).its('body.responseCode').should('eq', 201)
    })

    afterEach(() => {
      // Limpeza idempotente: se a conta já foi excluída no teste, a API apenas retorna 404 no body.
      api.deleteAccount(user.email, user.password)
    })

    it('CT-API-005 - POST /verifyLogin deve confirmar credenciais válidas', () => {
      api.verifyLogin(user.email, user.password).then(({ status, body }) => {
        expect(status).to.eq(200)
        cy.wrap(body).validateSchema(messageSchema)
        expect(body).to.deep.equal({ responseCode: 200, message: 'User exists!' })
      })
    })

    it('CT-API-006 - GET /getUserDetailByEmail deve retornar os dados do usuário', () => {
      cy.fixture('schemas/userDetail.schema.json').then((schema) => {
        api.getUserDetailByEmail(user.email).then(({ status, body }) => {
          expect(status).to.eq(200)
          expect(body.responseCode).to.eq(200)
          cy.wrap(body).validateSchema(schema)
          expect(body.user).to.include({
            name: user.name,
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName,
            company: user.company,
            address1: user.address1,
            country: user.country,
            city: user.city,
            zipcode: user.zipcode,
          })
        })
      })
    })

    it('CT-API-007 - PUT /updateAccount deve atualizar os dados do usuário', () => {
      const updatedUser = buildUser({ email: user.email, password: user.password })

      api.updateAccount(updatedUser).then(({ status, body }) => {
        expect(status).to.eq(200)
        cy.wrap(body).validateSchema(messageSchema)
        expect(body).to.deep.equal({ responseCode: 200, message: 'User updated!' })
      })

      api.getUserDetailByEmail(user.email).its('body.user').should('include', {
        name: updatedUser.name,
        first_name: updatedUser.firstName,
        last_name: updatedUser.lastName,
        city: updatedUser.city,
      })
    })

    it('CT-API-008 - DELETE /deleteAccount deve excluir a conta do usuário', () => {
      api.deleteAccount(user.email, user.password).then(({ status, body }) => {
        expect(status).to.eq(200)
        cy.wrap(body).validateSchema(messageSchema)
        expect(body).to.deep.equal({ responseCode: 200, message: 'Account deleted!' })
      })

      // Confirma o efeito: as credenciais deixam de ser válidas.
      api.verifyLogin(user.email, user.password).its('body.responseCode').should('eq', 404)
    })
  })
})
