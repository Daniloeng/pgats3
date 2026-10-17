/**
 * Página /login — contém os formulários de Login e de Signup (pré-cadastro).
 */
export const LoginPage = {
  elements: {
    loginTitle: () => cy.contains('h2', 'Login to your account'),
    loginEmail: () => cy.get('[data-qa="login-email"]'),
    loginPassword: () => cy.get('[data-qa="login-password"]'),
    loginButton: () => cy.get('[data-qa="login-button"]'),
    signupTitle: () => cy.contains('h2', 'New User Signup!'),
    signupName: () => cy.get('[data-qa="signup-name"]'),
    signupEmail: () => cy.get('[data-qa="signup-email"]'),
    signupButton: () => cy.get('[data-qa="signup-button"]'),
    formError: (text) => cy.contains('form p', text),
  },

  visit() {
    cy.visit('/login')
    this.elements.loginTitle().should('be.visible')
  },

  login(email, password) {
    if (email) this.elements.loginEmail().type(email)
    if (password) this.elements.loginPassword().typeSensitive(password)
    this.elements.loginButton().click()
  },

  startSignup(name, email) {
    this.elements.signupName().type(name)
    this.elements.signupEmail().type(email)
    this.elements.signupButton().click()
  },
}
