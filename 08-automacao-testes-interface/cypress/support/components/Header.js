/**
 * Componente de navegação presente em todas as páginas.
 */
export const Header = {
  elements: {
    home: () => cy.get('.shop-menu a[href="/"]'),
    products: () => cy.get('.shop-menu a[href="/products"]'),
    cart: () => cy.get('.shop-menu a[href="/view_cart"]'),
    signupLogin: () => cy.get('.shop-menu a[href="/login"]'),
    logout: () => cy.get('.shop-menu a[href="/logout"]'),
    deleteAccount: () => cy.get('.shop-menu a[href="/delete_account"]'),
    contactUs: () => cy.get('.shop-menu a[href="/contact_us"]'),
  },

  loggedInAs: () => cy.contains('.shop-menu a', 'Logged in as'),

  goToProducts() {
    this.elements.products().click()
  },
  goToCart() {
    this.elements.cart().click()
  },
  goToSignupLogin() {
    this.elements.signupLogin().click()
  },
  goToContactUs() {
    this.elements.contactUs().click()
  },
  logout() {
    this.elements.logout().click()
  },
  deleteAccount() {
    this.elements.deleteAccount().click()
  },
}
