/**
 * Página /signup — "Enter Account Information" e confirmação de conta criada/excluída.
 */
export const SignupPage = {
  elements: {
    title: () => cy.contains('h2', 'Enter Account Information'),
    genderMr: () => cy.get('#id_gender1'),
    password: () => cy.get('[data-qa="password"]'),
    days: () => cy.get('[data-qa="days"]'),
    months: () => cy.get('[data-qa="months"]'),
    years: () => cy.get('[data-qa="years"]'),
    newsletter: () => cy.get('#newsletter'),
    offers: () => cy.get('#optin'),
    firstName: () => cy.get('[data-qa="first_name"]'),
    lastName: () => cy.get('[data-qa="last_name"]'),
    company: () => cy.get('[data-qa="company"]'),
    address1: () => cy.get('[data-qa="address"]'),
    address2: () => cy.get('[data-qa="address2"]'),
    country: () => cy.get('[data-qa="country"]'),
    state: () => cy.get('[data-qa="state"]'),
    city: () => cy.get('[data-qa="city"]'),
    zipcode: () => cy.get('[data-qa="zipcode"]'),
    mobileNumber: () => cy.get('[data-qa="mobile_number"]'),
    createAccountButton: () => cy.get('[data-qa="create-account"]'),
    accountCreated: () => cy.get('[data-qa="account-created"]'),
    accountDeleted: () => cy.get('[data-qa="account-deleted"]'),
    continueButton: () => cy.get('[data-qa="continue-button"]'),
  },

  fillAccountInformation(user) {
    const el = this.elements
    el.title().should('be.visible')
    el.genderMr().check()
    el.password().typeSensitive(user.password)
    el.days().select(user.birthDay)
    el.months().select(user.birthMonth)
    el.years().select(user.birthYear)
    el.newsletter().check()
    el.offers().check()
    el.firstName().type(user.firstName)
    el.lastName().type(user.lastName)
    el.company().type(user.company)
    el.address1().type(user.address1)
    el.address2().type(user.address2)
    el.country().select(user.country)
    el.state().type(user.state)
    el.city().type(user.city)
    el.zipcode().type(user.zipcode)
    el.mobileNumber().type(user.mobileNumber)
  },

  submit() {
    this.elements.createAccountButton().click()
  },

  continue() {
    this.elements.continueButton().click()
  },
}
