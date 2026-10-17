/**
 * Rodapé com o formulário de assinatura (newsletter).
 * Obs.: o id "susbscribe_email" está escrito assim no próprio site.
 */
export const Footer = {
  elements: {
    title: () => cy.contains('.single-widget h2', 'Subscription'),
    emailInput: () => cy.get('#susbscribe_email'),
    subscribeButton: () => cy.get('#subscribe'),
    successMessage: () => cy.get('#success-subscribe .alert-success'),
  },

  subscribe(email) {
    this.elements.title().scrollIntoView().should('be.visible')
    this.elements.emailInput().clear()
    if (email) this.elements.emailInput().type(email)
    this.elements.subscribeButton().click()
  },
}
