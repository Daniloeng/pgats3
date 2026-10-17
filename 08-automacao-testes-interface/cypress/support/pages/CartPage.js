/**
 * Página /view_cart
 */
export const CartPage = {
  elements: {
    rows: () => cy.get('#cart_info_table tbody tr'),
    row: (id) => cy.get(`#cart_info_table tr#product-${id}`),
    price: (id) => cy.get(`#product-${id} .cart_price p`),
    quantity: (id) => cy.get(`#product-${id} .cart_quantity button`),
    total: (id) => cy.get(`#product-${id} .cart_total p`),
    deleteButton: (id) => cy.get(`#product-${id} .cart_quantity_delete`),
    emptyCart: () => cy.get('#empty_cart'),
    proceedToCheckout: () => cy.contains('.check_out', 'Proceed To Checkout'),
    checkoutModal: () => cy.get('#checkoutModal'),
    registerLoginLink: () => cy.contains('#checkoutModal a', 'Register / Login'),
  },

  visit() {
    cy.visit('/view_cart')
  },

  removeProduct(id) {
    this.elements.deleteButton(id).click()
    this.elements.row(id).should('not.exist')
  },

  proceedToCheckout() {
    this.elements.proceedToCheckout().click()
  },

  /** Converte "Rs. 1,500" em 1500 */
  parsePrice: (text) => Number(text.replace(/[^\d]/g, '')),
}
