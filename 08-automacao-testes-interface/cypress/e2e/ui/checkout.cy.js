import { buildCard, buildUser } from '../../support/factories/userFactory'
import { AutomationExerciseApi as api } from '../../support/api/automationExerciseApi'
import { ProductsPage } from '../../support/pages/ProductsPage'
import { CartPage } from '../../support/pages/CartPage'
import { CheckoutPage, PaymentPage } from '../../support/pages/CheckoutPage'

describe('UI | Checkout', () => {
  let products
  let messages

  before(() => {
    cy.fixture('products').then((data) => {
      products = data
    })
    cy.fixture('messages').then((data) => {
      messages = data
    })
  })

  context('Cenários felizes', () => {
    let user

    beforeEach(() => {
      user = buildUser()
      api.createAccount(user).its('body.responseCode').should('eq', 201)
      cy.loginViaUi(user.email, user.password)
    })

    afterEach(() => {
      api.deleteAccount(user.email, user.password)
    })

    it('CT-UI-014 - Deve finalizar uma compra com usuário logado', () => {
      ProductsPage.visit()
      ProductsPage.addProductToCart(products.blueTop.id)
      ProductsPage.viewCartFromModal()
      CartPage.proceedToCheckout()

      CheckoutPage.elements
        .deliveryAddress()
        .should('contain', `${user.firstName} ${user.lastName}`)
        .and('contain', user.address1)
        .and('contain', user.city)
      CheckoutPage.placeOrder('Pedido criado pela automação Cypress')

      PaymentPage.pay(buildCard())

      PaymentPage.elements.orderPlaced().should('contain', messages.orderPlaced)
      cy.contains('p', messages.orderConfirmed).should('be.visible')
    })
  })

  context('Cenários alternativos', () => {
    it('CT-UI-015 - Deve exigir login ao prosseguir para o checkout sem estar autenticado', () => {
      ProductsPage.visit()
      ProductsPage.addProductToCart(products.blueTop.id)
      ProductsPage.viewCartFromModal()
      CartPage.proceedToCheckout()

      CartPage.elements
        .checkoutModal()
        .should('be.visible')
        .and('contain', messages.checkoutLoginRequired)
      CartPage.elements.registerLoginLink().click()
      cy.location('pathname').should('eq', '/login')
    })
  })
})
