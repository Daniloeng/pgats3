/**
 * Página /contact_us
 */
export const ContactPage = {
  elements: {
    title: () => cy.contains('h2', 'Get In Touch'),
    name: () => cy.get('[data-qa="name"]'),
    email: () => cy.get('[data-qa="email"]'),
    subject: () => cy.get('[data-qa="subject"]'),
    message: () => cy.get('[data-qa="message"]'),
    uploadFile: () => cy.get('input[name="upload_file"]'),
    submitButton: () => cy.get('[data-qa="submit-button"]'),
    successMessage: () => cy.get('#contact-page .status.alert-success'),
  },

  visit() {
    cy.visit('/contact_us')
    this.elements.title().should('be.visible')
  },

  fill({ name, email, subject, message, file }) {
    const el = this.elements
    if (name) el.name().type(name)
    if (email) el.email().type(email)
    if (subject) el.subject().type(subject)
    if (message) el.message().type(message)
    if (file) el.uploadFile().selectFile(file)
  },

  submit() {
    this.elements.submitButton().click()
  },
}
