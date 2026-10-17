/**
 * Página /product_details/:id
 */
export const ProductDetailPage = {
  elements: {
    info: () => cy.get('.product-information'),
    name: () => cy.get('.product-information h2'),
    price: () => cy.get('.product-information span span'),
    category: () => cy.contains('.product-information p', 'Category:'),
    availability: () => cy.contains('.product-information p', 'Availability:'),
    condition: () => cy.contains('.product-information p', 'Condition:'),
    brand: () => cy.contains('.product-information p', 'Brand:'),
    quantity: () => cy.get('#quantity'),
    addToCartButton: () => cy.get('.product-information button.cart'),
    viewCartFromModal: () => cy.contains('#cartModal a', 'View Cart'),
  },

  visit(id) {
    cy.visit(`/product_details/${id}`)
  },

  setQuantity(quantity) {
    this.elements.quantity().clear().type(String(quantity))
  },

  addToCart() {
    this.elements.addToCartButton().click()
    cy.get('#cartModal').should('be.visible')
  },

  viewCartFromModal() {
    this.elements.viewCartFromModal().click()
  },
}
