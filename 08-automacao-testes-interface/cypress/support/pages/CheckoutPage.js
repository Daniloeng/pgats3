/**
 * Páginas /checkout e /payment
 */
export const CheckoutPage = {
  elements: {
    addressDetailsTitle: () => cy.contains('h2', 'Address Details'),
    deliveryAddress: () => cy.get('#address_delivery'),
    reviewOrderTitle: () => cy.contains('h2', 'Review Your Order'),
    comment: () => cy.get('textarea[name="message"]'),
    placeOrder: () => cy.contains('a.check_out', 'Place Order'),
  },

  placeOrder(comment) {
    this.elements.addressDetailsTitle().should('be.visible')
    this.elements.reviewOrderTitle().should('be.visible')
    if (comment) this.elements.comment().type(comment)
    this.elements.placeOrder().click()
  },
}

export const PaymentPage = {
  elements: {
    nameOnCard: () => cy.get('[data-qa="name-on-card"]'),
    cardNumber: () => cy.get('[data-qa="card-number"]'),
    cvc: () => cy.get('[data-qa="cvc"]'),
    expiryMonth: () => cy.get('[data-qa="expiry-month"]'),
    expiryYear: () => cy.get('[data-qa="expiry-year"]'),
    payButton: () => cy.get('[data-qa="pay-button"]'),
    orderPlaced: () => cy.get('[data-qa="order-placed"]'),
  },

  pay(card) {
    const el = this.elements
    el.nameOnCard().type(card.nameOnCard)
    el.cardNumber().typeSensitive(card.number)
    el.cvc().typeSensitive(card.cvc)
    el.expiryMonth().type(card.expiryMonth)
    el.expiryYear().type(card.expiryYear)
    el.payButton().click()
  },
}
